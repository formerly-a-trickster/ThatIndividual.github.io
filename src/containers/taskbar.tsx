import * as React from "react";
import { connect } from "react-redux";

import StartButton from "../components/start-button";
import TrayTask from "../components/tray-task";
import TrayTimer from "../components/tray-timer";
import { Dict, mapDictFlat, State} from "../utils";
import { focusWin, hideProg } from "../actions";
import { GenericPrg } from "../programs";

interface TaskbarProps {
  programs: Dict<GenericPrg>;
  handleFocus: (e: React.MouseEvent<any>, pid: number) => void;
  handleHide: (e: React.MouseEvent<any>, pid: number) => void;
}

class Taskbar extends React.Component<TaskbarProps, {}> {
  render() {
    return(
      <div id="taskbar">
        <StartButton key="task#start" />
        <div id="tray-tasks">
          {mapDictFlat(this.props.programs, prg => <TrayTask
            key={`task#${prg.pid}`}
            pid={prg.pid}
            title={prg.title}
            pressed={prg.window.hasFocus}
            handleClick={(e: React.MouseEvent<any>) => {
              if (!prg.window.hasFocus)
                this.props.handleFocus(e, prg.pid);
              else
                this.props.handleHide(e, prg.pid);
            }}/>
          )}
        </div>
        <TrayTimer key="task#timer" />
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    programs: state.programs
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleFocus: (e: React.MouseEvent<any>, pid: number) => {
      dispatch(focusWin(pid));
    },
    handleHide: (e: React.MouseEvent<any>, pid: number) => {
      dispatch(hideProg(pid));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Taskbar);