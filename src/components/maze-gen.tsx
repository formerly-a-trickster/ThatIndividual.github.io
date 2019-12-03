import * as React from "react";

import { randInt } from "../utils";

interface MazeGenState {
  maze: Array<Array<number>>;
  path: Array<[number, number]>;
  backtracker: number;
}

export default class MazeGen extends React.Component<{}, MazeGenState> {
  private canvas: HTMLCanvasElement;

  constructor() {
    super();

    let randMaze = [];

    for (let y = 0; y < 15; y++) {
      let randLine = [];
      for (let x = 0; x < 15; x++)
        randLine.push(0);
      randMaze.push(randLine);
    }

    this.state = {
      maze: randMaze,
      path: [[randInt(0, 14), randInt(0, 14)]],
      backtracker: NaN
    };

    this.mazeStep = this.mazeStep.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  mazeStep() {
    const { maze, path } = this.state;

    if (path.length > 0) {
      const currPath = path[path.length - 1],
            currX = currPath[0],
            currY = currPath[1],
            currCell = maze[currY][currX]

      let neighbours: Array<["N" | "S" | "V" | "E", number, number]> = [];

      if (currY - 1 >= 0 && maze[currY - 1][currX] === 0)
        neighbours.push(["N", currX, currY - 1]);

      if (currY + 1 < 15 && maze[currY + 1][currX] === 0)
        neighbours.push(["S", currX, currY + 1]);

      if(currX - 1 >= 0 && maze[currY][currX - 1] === 0)
        neighbours.push(["V", currX - 1, currY]);

      if(currX + 1 < 15 && maze[currY][currX + 1] === 0)
        neighbours.push(["E", currX + 1, currY]);

      if (neighbours.length > 0) {
        const nextStep = neighbours[randInt(0, neighbours.length - 1)],
              nextX = nextStep[1],
              nextY = nextStep[2];
        let currCellFlags = 0,
            nextCellFlags = 0,
            nextMaze = maze.map(line => {
              return line.slice();
            });

        switch(nextStep[0]) {
          case "N":
            currCellFlags = 1;
            nextCellFlags = 4;
            break;

          case "S":
            currCellFlags = 4;
            nextCellFlags = 1;
            break;

          case "V":
            currCellFlags = 8;
            nextCellFlags = 2;
            break;

          case "E":
            currCellFlags = 2;
            nextCellFlags = 8;
            break;
        }

        nextMaze[currY][currX] += currCellFlags;
        nextMaze[nextY][nextX] += nextCellFlags;

        this.setState({
            maze: nextMaze,
            path: [...path, [nextX, nextY]]
          },
          this.renderCanvas
        );
      }
      else {
        this.setState({
            path: path.slice(0, path.length - 1)
          },
          this.mazeStep
        );
      }
    }
    else {
      window.clearInterval(this.state.backtracker);
      this.setState({
          backtracker: NaN
        },
        this.renderCanvas
      );
    }
  }

  renderCanvas() {
    const context = this.canvas.getContext("2d");

    context.clearRect(0, 0, 306, 306);
    context.fillStyle = "#FF2C4B";
    context.fillRect(0, 0, 6, 306);
    context.fillRect(0, 0, 306, 6);

    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        const currCell = this.state.maze[y][x];

        if (currCell === 0)
          context.fillRect(x * 20 + 6, y * 20 + 6, 20, 20);
        else {
          if ((currCell & 4) !== 4)
            context.fillRect(x * 20 + 6, y * 20 + 14 + 6, 20, 6);
          if ((currCell & 2) !== 2)
            context.fillRect(x * 20 + 14 + 6, y * 20 + 6, 6, 20);
          if ((currCell & 6 ) === 6)
            context.fillRect(x * 20 + 14 + 6, y * 20 + 14 + 6, 6, 6);
        }
      }
    }

    const path = this.state.path;
    if (path.length > 0) {
      const highlight = path[path.length - 1];
      context.fillStyle = "#129DFF";
      context.fillRect(highlight[0] * 20 + 6, highlight[1] * 20 + 6, 14, 14);
    }
  }

  componentDidMount() {
    this.renderCanvas();
    this.setState({
      backtracker: window.setInterval(this.mazeStep, 100)
    });
  }

  componentWillUnmount() {
    if (!isNaN(this.state.backtracker))
      window.clearInterval(this.state.backtracker);
  }

  render() {
    return(
      <div className="prg-wrapper depressed">
        <div className="program maze-gen">
          <canvas
            ref={ref => this.canvas = ref}
            width={306}
            height={306}
          />
        </div>
      </div>
    );
  }
}