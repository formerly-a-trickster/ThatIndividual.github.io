import * as React from "react";

import { randInt } from "../utils";

function randomCells(n: number): Array<boolean> {
  let cells = [];

  for (let i = 0; i < n; i++)
    cells.push(!!randInt(0, 1));

  return cells;
}

function computeCell(game: Array<Array<boolean>>, x: number, y: number, mX: number, mY: number) {
  const cell = game[y][x],
        leftX = x - 1 < 0 ? mX - 1 : x - 1,
        rightX = x + 1 == mX ? 0 : x + 1,
        topY = y - 1 < 0 ? mY - 1 : y - 1,
        bottomY = y + 1 == mY ? 0 : y + 1, 
        neighbours = +game[topY][leftX] + +game[topY][x] + +game[topY][rightX] +
                     +game[y][leftX] + +game[y][rightX] + +game[bottomY][leftX] +
                     +game[bottomY][x] + +game[bottomY][rightX];
  if (cell) {
    if (neighbours < 2 || neighbours > 3)
      return false;
    else
      return true;
  }
  else {
    if (neighbours === 3)
      return true;
    else
      return false;
  }
};

function computeGame(game: Array<Array<boolean>>) {
  const mY = game.length,
        mX = game[0].length;

  let newGame: Array<Array<boolean>> = [];

  for (let y = 0; y < mY; y++) {
    let newLine: Array<boolean> = [];
    for (let x = 0; x < mX; x++)
      newLine.push(computeCell(game, x, y, mX, mY));
    newGame.push(newLine);
  }

  return newGame;
};

function randomGame(): Array<Array<boolean>> {
    let game = [];
    for (let y = 0; y < 30; y++)
      game.push(randomCells(30));
    return game;
}

interface GameState {
  prevGame: Array<Array<boolean>>;
  currGame: Array<Array<boolean>>;
  interval: number;
  isPlaying: boolean;
}

export default class GameOfLife extends React.Component<{}, GameState> {
  private canvas: HTMLCanvasElement;

  constructor() {
    super();
    
    this.state = {
      prevGame: [],
      currGame: randomGame(),
      interval: NaN,
      isPlaying: false
    };

    this.playGame = this.playGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.randomizeGame = this.randomizeGame.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.canvasClick = this.canvasClick.bind(this);
  }

  componentDidMount() {
    this.playGame();
  }

  componentWillUnmount() {
    this.pauseGame();
  }

  shouldComponentUpdate(nextProps: {}, nextState: GameState) {
    return this.state.isPlaying !== nextState.isPlaying;
  }

  playGame() {
    this.updateGame();
    this.setState({
      interval: window.setInterval(this.updateGame, 100),
      isPlaying: true
    });
  }

  pauseGame() {
    window.clearInterval(this.state.interval);
    this.setState({
        interval: NaN,
        isPlaying: false
      },
      this.renderGrid
    );
  }

  clearGame() {
    const clearGame = [];
    for (let y = 0; y < 30; y++) {
      const clearLine = [];
      for (let x = 0; x < 30; x++)
        clearLine.push(false);
      clearGame.push(clearLine);
    }

    this.setState({
      prevGame: this.state.currGame,
      currGame: clearGame      
    }, () => {
      this.renderCanvas();
      if (!this.state.isPlaying)
        this.renderGrid();
    });
  }

  randomizeGame() {
    this.setState({
      prevGame: this.state.currGame,
      currGame: randomGame()
    }, () => {
      this.renderCanvas();
      if (!this.state.isPlaying)
        this.renderGrid();
    });
  }

  canvasClick(e: React.MouseEvent<any>) {
    const canvasRect = this.canvas.getBoundingClientRect(),
          clickX = e.clientX - canvasRect.left,
          clickY = e.clientY - canvasRect.top;
    let gameX = NaN;
    let gameY = NaN;

    if ((clickX - 1) % 10 !== 0)
      gameX = Math.floor((clickX - 1) / 10);

    if ((clickY - 1) % 10 !== 0)
      gameY = Math.floor((clickY - 1) / 10);

    if (!isNaN(gameX) && !isNaN(gameY)) {
      const newGame = [];
      for (let y = 0; y < 30; y++) {
        let newLine = [];
        if (gameY !== y)
          newLine = this.state.currGame[y].slice();
        else {
          for (let x = 0; x < 30; x++)
            if (gameX === x)
              newLine.push(!this.state.currGame[y][x]);
            else
              newLine.push(this.state.currGame[y][x]);
        }
        newGame.push(newLine);
      }
      this.setState({
        prevGame: this.state.currGame,
        currGame: newGame
      }, () => {
        this.renderCanvas();
        if (!this.state.isPlaying)
          this.renderGrid();
      });
    }
  }

  updateGame() {
    this.setState({
        prevGame: this.state.currGame,
        currGame: computeGame(this.state.currGame)
      },
      this.renderCanvas
    );
  }

  renderCanvas() {
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, 301, 301);
    context.fillStyle = "#FF2C4B";

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 30; x++) {
        const currCell = this.state.currGame[y][x];

        if (currCell)
          context.fillRect(1 + x * 10, 1 + y * 10, 9, 9);
      }
    }
  }

  renderGrid() {
    const context = this.canvas.getContext("2d");
    context.fillStyle = "#0D2E4D";
    
    for (let y = 0; y <= 301; y += 10)
      context.fillRect(0, y, 301, 1);
    for (let x = 0; x <= 301; x += 10)
      context.fillRect(x, 0, 1, 301);
  }

  render() {
    return (
      <div className="prg-wrapper depressed">
        <div className="program game-of-life">
          <canvas
            ref={ref => this.canvas = ref}
            width={301}
            height={301}
            onClick={this.canvasClick}
          />
          {(this.state.isPlaying) ?
            <div className="embossed btn-large">
              <img src="img/UI/btn play disabled.png" />
            </div>
          :
            <button
              className="embossed btn-large"
              onClick={() => {
                if (!this.state.isPlaying)
                  this.playGame();
              }}
            >
              <img src="img/UI/btn play.png" />
            </button>
          }
          {(this.state.isPlaying) ?
            <button
              className="embossed btn-small"
              onClick={() => {
                if (this.state.isPlaying)
                  this.pauseGame();
              }}
            >
              <img src="img/UI/btn pause.png" />
            </button>
          :
            <div className="embossed btn-small">
              <img src="img/UI/btn pause disabled.png" />
            </div>
          }
          <button
            className="embossed btn-small"
            onClick={this.clearGame}
          >
            <img src="img/UI/btn clear.png" />
          </button>
          <button
            className="embossed btn-small"
            onClick={this.randomizeGame}
          >
            <img src="img/UI/btn random.png" />
          </button>
          <div className="embossed menu-padding"></div>
        </div>
      </div>
    );
  }
}