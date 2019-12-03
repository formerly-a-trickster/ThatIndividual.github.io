import * as React from "react";
import { connect } from "react-redux";

import { layout, openProg, unfocusWin, dragMove, dragEnd, resizeMove, resizeEnd } from "../actions";
import Launcher from "../components/launcher";
import Taskbar from "../containers/taskbar";
import Windows from "./windows";
import { newPrgArgs, GenericPrg } from "../programs";
import { NOTEPAD, TETRIS, GAMEOFLIFE, MUSICPLAYER, MAZEGEN } from "../constants";
import { State, Dict, mapDictFlat, randInt, debounce } from "../utils";

// No own props.
// Desktop is completely controlled from the redux store and dispatches.

interface DesktopProps {
  upid: number,
  width: number,
  height: number,
  isDragging: boolean;
  isResizing: boolean;
  programs: Dict<GenericPrg>;
  handleLayout: (width: number, height: number) => void;
  handleOpenProg: (e: React.MouseEvent<any>, args: newPrgArgs) => void;
  handleDragMove: (e: React.MouseEvent<any>) => void;
  handleDragEnd: (e: React.MouseEvent<any>) => void;
  handleResizeMove: (e: React.MouseEvent<any>) => void;
  handleResizeEnd: (e: React.MouseEvent<any>) => void;
  handleUnfocus: (e: React.MouseEvent<any>) => void;
}

class Desktop extends React.Component<DesktopProps, {}> {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentWillMount() {
    window.addEventListener("resize", debounce(() =>
      this.props.handleLayout(window.innerWidth, window.innerHeight), 200
    ) as any);
  }

  render() {
    return (
      <div
        id="desktop"
        className={(this.props.isDragging || this.props.isResizing) ?"unselectable" :""}
        onMouseDown={(e) => this.props.handleUnfocus(e)}
        onMouseMove={(e) => {
          if (this.props.isDragging)
            this.props.handleDragMove(e);
          else if (this.props.isResizing)
            this.props.handleResizeMove(e);
        }}
        onMouseUp={(e) => {
          if (this.props.isDragging)
            this.props.handleDragEnd(e)
          else if (this.props.isResizing)
            this.props.handleResizeEnd(e);
        }}
      >
        <Windows />
        <Taskbar />
        <Launcher
          title="Notepad"
          icon="notepad.png"
          linkTo={(e: React.MouseEvent<any>) =>
            this.props.handleOpenProg(e, {
              pid: this.props.upid,
              entityOf: NOTEPAD,
              title: "untitled.txt - Notepad",
              x: randInt(0, this.props.width - 300),
              y: randInt(0, this.props.height - 200 - 28),
              canResizeH: true,
              canResizeV: true
            })
          }
          shortcut={true}
        />
        <Launcher
          title="Conway's Game of Life"
          icon="conway.png"
          linkTo={(e: React.MouseEvent<any>) =>
            this.props.handleOpenProg(e, {
              pid: this.props.upid,
              entityOf: GAMEOFLIFE,
              title: "Conway's Game of Life",
              x: randInt(0, this.props.width - 313),
              y: randInt(0, this.props.height - 333 - 28),
              width: 313,
              height: 355
            })
          }
          shortcut={true}
        />
        <Launcher
          title="Tetris"
          icon="tetris.png"
          linkTo={(e: React.MouseEvent<any>) =>
            this.props.handleOpenProg(e, {
              pid: this.props.upid,
              entityOf: TETRIS,
              title: "Tetris",
              x: randInt(0, this.props.width - 214),
              y: randInt(0, this.props.height - 434 - 28),
              width: 256,
              height: 356
            })
          }
          shortcut={true}
        />
        <Launcher
          title="Maze Generator"
          icon="maze.png"
          linkTo={(e: React.MouseEvent<any>) =>
            this.props.handleOpenProg(e, {
              pid: this.props.upid,
              entityOf: MAZEGEN,
              title: "Maze Generator",
              x: randInt(0, this.props.width - 318),
              y: randInt(0, this.props.height - 338 - 28),
              width: 318,
              height: 338
            })
          }
          shortcut={true}
        />
        <Launcher
          title="Music Player"
          icon="music.png"
          linkTo={(e: React.MouseEvent<any>) =>
            this.props.handleOpenProg(e, {
              pid: this.props.upid,
              entityOf: MUSICPLAYER,
              title: "Music Player",
              x: randInt(0, this.props.width - 290),
              y: randInt(0, this.props.height - 130 - 28),
              width: 290,
              height: 130
            })
          }
          shortcut={true}
        />
      </div>
    );
  };
};

function mapStateToProps(state: State) {
  return {
    upid: state.upid,
    width: state.desktopWidth,
    height: state.desktopHeight,
    isDragging: state.isDragging,
    isResizing: state.isResizing,
    programs: state.programs
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    handleLayout: (width: number, height: number) => {
      dispatch(layout(width, height));
    },
    handleOpenProg: (e: React.MouseEvent<any>, args: newPrgArgs) => {
      dispatch(openProg(args));
    },
    handleDragMove: (e: React.MouseEvent<any>) => {
      dispatch(dragMove(e.clientX, e.clientY));
    },
    handleDragEnd: (e: React.MouseEvent<any>) => {
      dispatch(dragEnd());
    },
    handleResizeMove: (e: React.MouseEvent<any>) => {
      dispatch(resizeMove(e.clientX, e.clientY));
    },
    handleResizeEnd: (e: React.MouseEvent<any>) => {
      dispatch(resizeEnd());
    },
    handleUnfocus: (e: React.MouseEvent<any>) => {
      dispatch(unfocusWin());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);