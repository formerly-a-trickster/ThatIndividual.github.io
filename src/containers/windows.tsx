import * as React from "react";
import { connect } from "react-redux";

import Window from "./window";
import Notepad from "../components/notepad";
import GameOfLife from "../components/game-of-life";
import Tetris from "../components/tetris";
import MazeGen from "../components/maze-gen";
import MusicPlayer from "../components/music-player";
import { Dict, mapDictFlat, State } from "../utils";
import { GenericPrg } from "../programs";
import { NOTEPAD, GAMEOFLIFE, TETRIS, MAZEGEN, MUSICPLAYER } from "../constants";

function makeProgram(entityOf: NOTEPAD | GAMEOFLIFE | TETRIS | MAZEGEN | MUSICPLAYER) {
  switch (entityOf) {
    case NOTEPAD: return <Notepad />;
    case GAMEOFLIFE: return <GameOfLife />;
    case TETRIS: return <Tetris />;
    case MAZEGEN: return <MazeGen />;
    case MUSICPLAYER: return <MusicPlayer />;
    default: return <div className="prg-wrapper"></div>;
  };
};

interface WindowsArgs {
  programs: Dict<GenericPrg>;
}

function Windows({ programs }: WindowsArgs) {
  return (
    <div id="window-container">
      {mapDictFlat(programs, (prg: GenericPrg) =>
        <Window
          key={prg.pid}
          pid={prg.pid}
          program={makeProgram(prg.entityOf)}
          title={prg.title}
          pos={prg.window.pos}
          zIndex={prg.window.zIndex}
          canResizeH={prg.window.canResizeH}
          canResizeV={prg.window.canResizeV}
          isDragged={prg.window.isDragged}
          isResized={prg.window.isResized}
          isVisible={prg.window.isVisible}
          hasFocus={prg.window.hasFocus}
        />
      )}
    </div>
  );
}

function mapStateToProps(state: State) {
  return {
    programs: state.programs
  };
};

export default connect(mapStateToProps)(Windows);