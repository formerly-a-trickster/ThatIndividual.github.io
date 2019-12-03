import * as React from "react";

import { inArr, randInt } from "../../utils";
import TetrisGame from "./game";

export default class Tetris extends React.Component<{}, {}> {
  public canvas: HTMLCanvasElement;
  private game: TetrisGame;

  componentDidMount() {
    this.game = new TetrisGame(this.canvas);
    this.canvas.focus();
  };

  componentWillUnmount() {
    this.game.teardown();
  };

  render() {
    return (
      <div className="prg-wrapper depressed">
        <div className="program tetris">
          <canvas
            ref={ref => this.canvas = ref}
            tabIndex={0}
            width={244}
            height={324}
          />
        </div>
      </div>
    );
  };
};