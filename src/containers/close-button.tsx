import * as React from "react";
import { connect } from "react-redux";

import { closeProg } from "../actions";


interface Args {
  pid: number;
  handleClick: (e: React.MouseEvent<any>, pid: number) => void;
}

function CloseButton({ pid, handleClick }: Args) {
  return (
    <button
      className="title-button close"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => handleClick(e, pid)}
    >
      <img src="img/UI/tb close.png" />
    </button>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    handleClick: (e: React.MouseEvent<any>, pid: number) => {
      dispatch(closeProg(pid));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CloseButton) as any;