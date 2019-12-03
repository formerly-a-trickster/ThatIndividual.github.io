import * as React from "react";
import { connect } from "react-redux";

import { hideProg } from "../actions";

interface Args {
  pid: number;
  handleClick: (e: React.MouseEvent<any>, pid: number) => void;
}

function HideButton({ pid, handleClick }: Args) {
  return (
    <button
      className="title-button hide"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => handleClick(e, pid)}
    >
      <img
        className="hide-button"
        src="img/UI/tb hide.png"
      />
    </button>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    handleClick: (e: React.MouseEvent<any>, pid: number) => {
      dispatch(hideProg(pid));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(HideButton) as any;