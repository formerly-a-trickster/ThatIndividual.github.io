import * as React from "react";
import { connect } from "react-redux";

import { dragStart } from "../actions";
import HideButton from "./hide-button";
import CloseButton from "./close-button";


interface TitleBarArgs {
  title: string;
  pid: number;
  hasFocus: boolean;
  handleDragStart: (e: React.MouseEvent<any>, pid: number) => void;
};

function TitleBar({ title, pid, hasFocus, handleDragStart }: TitleBarArgs ) {
  return (
    <div
      className={(hasFocus) ? "title-bar focus" : "title-bar"}
      onMouseDown={(e) => handleDragStart(e, pid)}
    >
      <p className="unselectable">{title}</p>
      <HideButton pid={pid} />
      <CloseButton pid={pid} />
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    handleDragStart: (e: React.MouseEvent<any>, pid: number): void => {
      dispatch(dragStart(pid, e.clientX, e.clientY));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(TitleBar) as any;