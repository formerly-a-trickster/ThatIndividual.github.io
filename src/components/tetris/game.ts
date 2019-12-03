import { randInt } from "../../utils";
import { tetro, field } from "./data";

enum Status {
  loading,
  splash,
  playing,
  paused,
  gameover,
  gamewon,
  teardown
};

interface Piece {
  type: number;
  rotation: number;
  field: Array<number>;
  x: number;
  y: number;
};

export default class Game {
  private status: Status;
  private time: {
    fps: number;
    interval: number;
    curr: number;
    last: number;
    delta: number;
  };
  private screen: {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    underCanvas: HTMLCanvasElement;
    underContext: CanvasRenderingContext2D;
    backColor: string;
  };
  private data: {
    sprites: HTMLImageElement;
    pieces: Array<number>;
    colours: Array<string>;
    isLoaded: boolean;
  }
  private state: {
    fallSpeed: number;
    timer: number;
    level: number;
    score: number;
    backToBackTetris: number;
    combo: number;
    linesRemaining: number;
    currPiece: Piece | null;
    nextPiece: Piece | null;
    holdPiece: Piece | null;
    field: Array<number>;
    keymap: {
      up: boolean;
      left: boolean;
      down: boolean;
      right: boolean;
      z: boolean;
      x: boolean;
      c: boolean;
    };
  };

  constructor(canvas: HTMLCanvasElement) {
    this.status = Status.loading;
    this.setupTime();
    this.setupScreen(canvas);
    this.setupState();
    this.setupData();
    this.loop();
  };

  setupTime = () => {
    const fps = 30;

    this.time = {
      fps,
      interval: 1000 / fps,
      curr: 0,
      last: (new Date()).getTime(),
      delta: 0
    };
  };

  setupScreen = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d"),
          width = canvas.width,
          height = canvas.height;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    const underCanvas = document.createElement("canvas");
    underCanvas.setAttribute("width", `${width}`);
    underCanvas.setAttribute("height", `${height}`);
    const underContext = underCanvas.getContext("2d");
    underContext.mozImageSmoothingEnabled = false;
    underContext.webkitImageSmoothingEnabled = false;
    underContext.imageSmoothingEnabled = false;

    this.screen = {
      canvas,
      context,
      width,
      height,
      underCanvas,
      underContext,
      backColor: "black"
    };
  };

  setupState = () => {
    this.state = {
      fallSpeed: 500,
      timer: 0,
      level: 1,
      score: 0,
      backToBackTetris: 0,
      combo: 0,
      linesRemaining: 15,
      currPiece: null,
      nextPiece: null,
      holdPiece: null,
      field: [],
      keymap: {
        up: false,
        down: false,
        left: false,
        right: false,
        z: false,
        x: false,
        c: false
      }
    };
    this.screen.canvas.addEventListener("keydown", this.handleInput);
  };

  setupData = () => {
    this.data = {
      sprites: document.createElement("img"),
      pieces: tetro,
      colours: [
        "#0092FF", "#FF0000", "#49FF00", "#00FF92", "#FF00DB", "#FFDB00", "#4900FF", "#AAAAAA"
      ],
      isLoaded: false
    };

    fetch("/img/sprites/tetris.png").then(
      response => response.blob()
    ).then(blob => {
      const spritesURL = URL.createObjectURL(blob);
      this.data.sprites.src = spritesURL;
      this.data.isLoaded = true;
    });
  };

  handleInput = (e: KeyboardEvent) => {
    const keymap = this.state.keymap;

    switch (e.key) {
      case "ArrowUp":
        keymap.up = true;
        break;

      case "ArrowDown":
        keymap.down = true;
        break;

      case "ArrowLeft":
        keymap.left = true;
        break;

      case "ArrowRight":
        keymap.right = true;
        break;

      case "z":
        keymap.z = true;
        break;

      case "x":
        keymap.x = true;
        break;

      case "c":
        keymap.c = true;
        break;

      default:
        break;
    };
  };

  teardown = () => {
    this.status = Status.teardown;
    this.screen.canvas.removeEventListener("keydown", this.handleInput);
  };

  restart = () => {
    this.state.fallSpeed = 500;
    this.state.timer = this.time.curr + this.state.fallSpeed;
    this.state.level = 1;
    this.state.score = 0;
    this.state.backToBackTetris = 0;
    this.state.combo = 0;
    this.state.linesRemaining = 15;
    this.state.field = field.slice();
    this.pipePiece();
  };

  loop = () => {
    const time = this.time;

    time.curr = (new Date()).getTime();
    time.delta = time.curr - time.last;
    this.update();

    if (time.delta > time.interval) {
      this.draw();
      time.last = time.curr - (time.delta % time.interval);
    };

    if (this.status !== Status.teardown)
      window.requestAnimationFrame(this.loop);
  };

  update = () => {
    const key = this.state.keymap,
          piece = this.state.currPiece;

    if (this.status === Status.loading) {
      if (this.data.isLoaded === true) {
        this.status = Status.splash;
      };
    }
    else if (this.status === Status.splash) {
      if (key.z === true || key.x === true || key.c === true) {
        this.state.timer = this.time.curr + this.state.fallSpeed;
        this.pipePiece();
        this.state.field = field.slice();
        this.renderUnderlayer();
        this.status = Status.playing;
      };
    }
    else if (this.status === Status.playing) {
      if (key.down)
        this.pieceMoveDown();
      else if (key.left)
        this.pieceMoveLeft();
      else if (key.right)
        this.pieceMoveRight();
      else if (key.z)
        this.pieceRotate();
      else if (key.x)
        this.pieceHold();
      else if (key.c) {
        this.status = Status.paused;
      };

      if (this.state.timer < this.time.curr) {
        this.state.timer += this.state.fallSpeed;
        this.pieceMoveDown();
      };
    }
    else if (this.status === Status.paused) {
      if (key.c) {
        this.status = Status.playing;
        this.state.timer = this.time.curr + this.state.fallSpeed;
      };
    }
    else if (this.status === Status.gameover) {
      if (key.z === true || key.x === true || key.c === true) {
        this.status = Status.playing;
        this.restart();
        this.renderUnderlayer();
      };
    }
    else if (this.status === Status.gamewon) {
      if (key.z === true || key.x === true || key.c === true) {
        this.status = Status.playing;
        this.restart();
        this.renderUnderlayer();
      };
    }

    this.state.keymap = {
      up: false, down: false, left: false, right: false,
      z: false, x: false, c: false
    };
  };

  draw = () => {
    const ctx = this.screen.context,
          piece = this.state.currPiece,
          field = this.state.field,
          sprites = this.data.sprites;
    ctx.clearRect(0, 0, this.screen.width, this.screen.height);

    if (this.status === Status.splash) {
      this.drawString(ctx, "   Tetris", 16, 25);
      this.drawString(ctx, "Cease & Desist", 8, 50);
      this.drawString(ctx, "   Edition", 8, 75);
      ctx.drawImage(sprites, 80, 0, 8, 16, 24, 125, 16, 32);
      ctx.drawImage(sprites, 104, 0, 8, 16, 40, 125, 16, 32);
      ctx.drawImage(sprites, 96, 0, 8, 16, 56, 125, 16, 32);
      this.drawString(ctx, "    - move", 24, 125);
      this.drawString(ctx, " z  - rotate", 24, 150);
      this.drawString(ctx, " x  - hold", 24, 175);
      this.drawString(ctx, " c  - pause", 24, 200);
      this.drawString(ctx, " Press z", 24, 250);
      this.drawString(ctx, "   to start", 24, 275);
    }
    else if (this.status === Status.playing) {
      ctx.drawImage(this.screen.underCanvas, 0, 0);
      this.drawPiece(ctx, piece, 2 + piece.x * 16, 2 + piece.y * 16);
    }
    else if (this.status === Status.paused) {
      ctx.drawImage(this.screen.underCanvas, 0, 0);
      this.drawPiece(ctx, piece, 2 + piece.x * 16, 2 + piece.y * 16);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 130, 164, 64);
      this.drawString(ctx, "Paused", 34, 146);
    }
    else if (this.status === Status.gameover) {
      ctx.drawImage(this.screen.underCanvas, 0, 0);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 130, 164, 64);
      this.drawString(ctx, "Game Over", 10, 146);
    }
    else if (this.status === Status.gamewon) {
      ctx.drawImage(this.screen.underCanvas, 0, 0);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 130, 164, 64);
      this.drawString(ctx, "You Won!", 18, 146);
    }
  };

  drawString = (
    dest: CanvasRenderingContext2D,
    string: string,
    x: number,
    y: number
  ) => {
    const sprites = this.data.sprites;

    for (let i = 0; i < string.length; i++) {
      let char = string[i],
          sprX = 0,
          sprY = 0;
      
      if (char === " ")
        continue;
      else if (/^[0-9]$/.test(char)) {
        sprX = +char;
        sprY = 0;
      }
      else if (/^[A-Z]$/.test(char)) {
        sprX = char.charCodeAt(0) - 65;
        sprY = 1;
      }
      else if (/^[a-z]$/.test(char)) {
        sprX = char.charCodeAt(0) - 97;
        sprY = 2;
      }
      else {
        const symb = "#%&@$.,!?:;'\"()[]*/\\+-<=>".indexOf(char);
        if (symb !== -1) {
          sprX = symb;
          sprY = 3;
        }
      }

      dest.drawImage(
        sprites,
        sprX * 8, sprY * 16, 8, 16,
        x + i * 16, y, 16, 32
      );
    }
  };

  drawPiece = (
    dest: CanvasRenderingContext2D,
    piece: Piece,
    x: number,
    y: number
  ) => {
    const sprites = this.data.sprites;

    for (let i = 0; i < 16; i++) {
      const cellX = i % 4,
            cellY = Math.floor(i / 4);

      if (piece.field[i] !== 0) {
        dest.fillStyle = this.data.colours[piece.type];
        dest.fillRect(x + cellX * 16, y + cellY * 16, 16, 16);
        dest.drawImage(
          sprites,
          200, 0, 8, 8,
          x + cellX * 16, y + cellY * 16, 16, 16
        );
      };
    };
  };

  renderUnderlayer = () => {
    const utx = this.screen.underContext,
          sprites = this.data.sprites,
          field = this.state.field;

    utx.clearRect(0, 0, this.screen.width, this.screen.height);
    utx.fillStyle = "#111111";
    // game grid
    for (let x = 0; x < 11; x++)
      utx.fillRect(x * 16, 0, 4, 4 + 16 * 20);
    for (let y = 0; y < 21; y++)
      utx.fillRect(0, y * 16, 4 + 16 * 10, 4);
    // next grid
    for (let x = 0; x < 5; x++)
      utx.fillRect(11 * 16 + x * 16, 9 * 16, 4, 4 + 4 * 16);
    for (let y = 0; y < 5; y++)
      utx.fillRect(11 * 16, 9 * 16 + y * 16, 4 + 4 * 16, 4);
    // hold grid
    for (let x = 0; x < 5; x++)
      utx.fillRect(11 * 16 + x * 16, 16 * 16, 4, 4 + 4 * 16);
    for (let y = 0; y < 5; y++)
      utx.fillRect(11 * 16, 16 * 16 + y * 16, 4 + 4 * 16, 4);

    this.drawString(utx, `Lvl${this.state.level}`, 2 + 11 * 16, 0);
    this.drawString(
      utx,
      `${this.state.score}`,
      2 + (5 - (""+Math.floor(this.state.score)).length + 10) * 16,
      2 * 16
    );
    this.drawString(utx, "Next", 2 + 11 * 16, 7 * 16);
    this.drawString(utx, "Hold", 2 + 11 * 16, 14 * 16);

    this.drawPiece(utx, this.state.nextPiece, 2 + 11 * 16, 2 + 9 * 16);
    if (this.state.holdPiece !== null)
      this.drawPiece(utx, this.state.holdPiece, 2 + 11 * 16, 2 + 16 * 16);
    // game field
    for (let i = 0; i < 200; i++) {
      const x = i % 10,
            y = Math.floor(i / 10);

      if (field[i] !== 0) {
        utx.fillStyle = this.data.colours[field[i] - 1];
        utx.fillRect(2 + x * 16, 2 + y * 16, 16, 16);
        utx.drawImage(sprites, 200, 0, 8, 8, 2 + x * 16, 2 + y * 16, 16, 16);
      };
    };
  };

  ///////////
  // Piece //
  ///////////
  pipePiece = () => {
    do {
      let type = randInt(0, 6);
      if (this.state.nextPiece !== null) {
        while (type === this.state.nextPiece.type)
          type = randInt(0, 6);
      }

      const field = this.data.pieces.slice(type * 64, type * 64 + 16),
            newPiece = {
              type,
              rotation: 0,
              field,
              x: 3,
              y: -2
            };
      this.state.currPiece = this.state.nextPiece;
      this.state.nextPiece = newPiece;
    }
    while (this.state.currPiece === null);
  };

  pieceCanMoveDown = (): boolean => {
    const piece = this.state.currPiece,
          field = this.state.field;

    for (let i = 0; i < 16; i++) {
      const x = i % 4,
            y = Math.floor(i / 4);

      if (piece.field[i] !== 0) {
        const absX = piece.x + x,
              absY = piece.y + y;

        if (absY === 19)
          return false;
        else if (absY >= 0)
          if (field[absX + (absY + 1) * 10] !== 0)
            return false;
      };
    };

    return true;
  };

  pieceCanMoveLeft = (): boolean => {
    const piece = this.state.currPiece,
          field = this.state.field;

    for (let i = 0; i < 16; i++) {
      const x = i % 4,
            y = Math.floor(i / 4);

      if (piece.field[i] !== 0) {
        const absX = piece.x + x,
              absY = piece.y + y;

        if (absX === 0)
          return false;
        else if (absY >= 0)
          if (field[(absX - 1) + absY * 10] !== 0)
            return false;
      };
    };

    return true;
  };

  pieceCanMoveRight = (): boolean => {
    const piece = this.state.currPiece,
          field = this.state.field;

    for (let i = 0; i < 16; i++) {
      const x = i % 4,
            y = Math.floor(i / 4);

      if (piece.field[i] !== 0) {
        const absX = piece.x + x,
              absY = piece.y + y;

        if (absX === 9)
          return false;
        else if (absY >= 0)
          if (field[(absX + 1) + absY * 10] !== 0)
            return false;
      };
    };

    return true;
  };

  pieceCanRotate = (): boolean => {
    const piece = this.state.currPiece,
          field = this.state.field,
          next = piece.type * 64 + ((piece.rotation + 1) % 4) * 16,
          nextField = tetro.slice(next, next + 16);

    for (let i = 0; i < 16; i++) {
      const x = i % 4,
            y = Math.floor(i / 4);

      if (nextField[i] !== 0) {
        const absX = piece.x + x,
              absY = piece.y + y;

        if (absX < 0 || absX > 9 || absY < 0)
          return false;
        else if (absY > 19)
          continue;
        else
          if (field[absX + absY * 10] !== 0)
            return false;
      };
    };

    return true;
  };

  pieceCanHold = (): boolean => {
    const hold = this.state.holdPiece,
          piece = this.state.currPiece,
          field = this.state.field;

    if (this.state.holdPiece !== null) {
      for (let i = 0; i < 16; i++) {
        const x = i % 4,
              y = Math.floor(i / 4);

        if (hold.field[i] !== 0) {
          const absX = piece.x + x,
                absY = piece.y + y;

        if (absX < 0 || absX > 9 || absY < 0)
          return false;
        else if (absY > 19)
          continue;
        else
          if (field[absX + absY * 10] !== 0)
            return false;
        };
      };
    };

    return true;
  };

  pieceMoveDown = () => {
    if (this.pieceCanMoveDown())
      this.state.currPiece.y += 1;
    else {
      this.meldPieceToField();
      this.manageCompletedLines();
      this.pipePiece();
      this.renderUnderlayer();
      if (this.gameIsOver()) {
        this.status = Status.gameover;
        this.state.currPiece = null;
        this.state.nextPiece = null;
        this.state.holdPiece = null;
      }
    };
  };

  pieceMoveLeft = () => {
    if (this.pieceCanMoveLeft())
      this.state.currPiece.x -= 1;
  };

  pieceMoveRight = () => {
    if (this.pieceCanMoveRight())
      this.state.currPiece.x += 1;
  };

  pieceRotate = () => {
    if (this.pieceCanRotate()) {
      const next = this.state.currPiece.type * 64 + ((this.state.currPiece.rotation + 1) % 4) * 16;
      this.state.currPiece.field = tetro.slice(next, next + 16);
      this.state.currPiece.rotation = (this.state.currPiece.rotation + 1) % 4;
    };
  };

  pieceHold = () => {
    if (this.state.holdPiece === null) {
      this.state.holdPiece = this.state.currPiece;
      this.pipePiece();
    }
    else if (this.pieceCanHold()) {
      let temp = this.state.currPiece;
      this.state.currPiece = this.state.holdPiece;
      this.state.currPiece.x = temp.x;
      this.state.currPiece.y = temp.y;
      this.state.holdPiece = temp;
    };
    this.state.holdPiece.x = 3;
    this.state.holdPiece.x = -2;
    this.renderUnderlayer();
  };

  meldPieceToField = () => {
    const piece = this.state.currPiece,
          field = this.state.field;

    for (let i = 0; i < 16; i++) {
      const x = i % 4,
            y = Math.floor(i / 4);

      if (piece.field[i] !== 0) {
        const absX = piece.x + x,
              absY = piece.y + y;

        field[absX + absY * 10] = piece.field[x + y * 4];
      };
    };
  };

  manageCompletedLines = () => {
    const field = this.state.field;
    let newField = field.slice(),
        currLine = 19,
        completedLines = 0;

    for (let i = 190; i >= 0; i -= 10) {
      let lineIsComplete = true;
      for (let j = 0; j < 10; j++)
        lineIsComplete = lineIsComplete && (field[i + j] !== 0);
      if (lineIsComplete)
        completedLines += 1;
      else {
        for (let j = 0; j < 10; j++)
          newField[(currLine * 10) + j] = field[i + j];
        currLine--;
      };
    };
    this.state.field = newField;

    switch (completedLines) {
      case 0:
        this.state.backToBackTetris = 0;
        this.state.combo = 0;
        break;
      case 1:
        this.state.score += 1 * this.state.level + 0.5 * this.state.combo;
        this.state.linesRemaining -= 1 + Math.floor(0.5 * this.state.combo);
        this.state.combo += 1;
        this.state.backToBackTetris = 0;
        break;
      case 2:
        this.state.score += 3 * this.state.level + 0.5 * this.state.combo;
        this.state.linesRemaining -= 3 + Math.floor(0.5 * this.state.combo);
        this.state.combo += 1;
        this.state.backToBackTetris = 0;
        break;
      case 3:
        this.state.score += 5 * this.state.level + 0.5 * this.state.combo;
        this.state.linesRemaining -= 5 + Math.floor(0.5 * this.state.combo);
        this.state.combo += 1;
        this.state.backToBackTetris = 0;
        break;
      case 4:
        if (this.state.backToBackTetris > 0) {
          this.state.score +=
            (8 * this.state.level + 0.5 * this.state.combo) *
            (1 + this.state.backToBackTetris * 0.5);
          this.state.linesRemaining -= Math.floor(
            (8 * this.state.level + 0.5 * this.state.combo) *
            (1 + this.state.backToBackTetris * 0.5)
          );
        }
        else {
          this.state.score += 8 * this.state.level + 0.5 * this.state.combo;
          this.state.linesRemaining -= 8 + Math.floor(0.5 * this.state.combo);
        };
        this.state.backToBackTetris += 1;
        this.state.combo += 1;
        break;
    };

    if (this.state.linesRemaining <= 0)
      this.levelUp();
  };

  gameIsOver = (): boolean => {
    let topLineIsFull = false;
    for (let i = 0; i < 10; i++)
      topLineIsFull = topLineIsFull || (this.state.field[i] !== 0);
    return topLineIsFull;
  };

  levelUp = () => {
    if (this.state.level !== 9) {
      this.state.level += 1;
      this.state.linesRemaining = 10 + 5 * this.state.level;
      this.state.fallSpeed -= 50;
      this.state.field = this.state.field.map(cell => {
        if (cell !== 0)
          return 8;
        else
          return 0;
      });
    }
    else {
      this.status = Status.gamewon;
      this.state.currPiece = null;
      this.state.nextPiece = null;
      this.state.holdPiece = null;
    };
  };
};