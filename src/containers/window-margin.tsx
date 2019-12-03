import * as React from "react";
import { connect } from "react-redux";

import { resizeStart } from "../actions";
import {
  MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT,
  MARGIN_TOP_LEFT, MARGIN_TOP_RIGHT, MARGIN_BOTTOM_LEFT, MARGIN_BOTTOM_RIGHT,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE
} from "../constants";

interface WMOwnProps {
  pid: number;
  type: MARGIN_TOP | MARGIN_BOTTOM | MARGIN_LEFT | MARGIN_RIGHT |
        MARGIN_TOP_LEFT | MARGIN_TOP_RIGHT | MARGIN_BOTTOM_LEFT | MARGIN_BOTTOM_RIGHT;
  canResize: boolean;
}

interface WMProps extends WMOwnProps {
  handleResizeStart: (
    e: React.MouseEvent<any>,
    pid: number,
    dimension: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
               E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE
  ) => void;
}

function WindowMargin({ pid, type, canResize, handleResizeStart }: WMProps) {
  switch (type) {
    case MARGIN_TOP:
      if (canResize) {
        return <div
          className="margin top"
          style={{cursor: "ns-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, N_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin top"></div>;
      
    case MARGIN_BOTTOM:
      if (canResize) {
        return <div
          className="margin bottom"
          style={{cursor: "ns-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, S_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin bottom"></div>;
      
    case MARGIN_LEFT:
      if (canResize) {
        return <div
          className="margin left"
          style={{cursor: "ew-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, V_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin left"></div>;
      
    case MARGIN_RIGHT:
      if (canResize) {
        return <div
          className="margin right"
          style={{cursor: "ew-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, E_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin right"></div>;

    case MARGIN_TOP_LEFT:
      if (canResize) {
        return <div
          className="margin topleft"
          style={{cursor: "nwse-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, NV_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin topleft"></div>;

    case MARGIN_TOP_RIGHT:
      if (canResize) {
        return <div
          className="margin topright"
          style={{cursor: "nesw-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, NE_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin topright"></div>;


    case MARGIN_BOTTOM_LEFT:
      if (canResize) {
        return <div
          className="margin bottomleft"
          style={{cursor: "nesw-resize"}}
          onMouseDown={(e) => handleResizeStart(e, pid, SV_WIN_RESIZE)}
        ></div>;
      }
      else
        return <div className="margin bottomleft"></div>;

    case MARGIN_BOTTOM_RIGHT:
    if (canResize) {
      return <div
        className="margin bottomright"
        style={{cursor: "nwse-resize"}}
        onMouseDown={(e) => handleResizeStart(e, pid, SE_WIN_RESIZE)}
      ></div>;
    }
    else
      return <div className="margin bottomright"></div>;
  };
};

interface WMDispatch {
  handleResizeStart: (
    e: React.MouseEvent<any>,
    pid: number,
    dimension: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
               E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE
  ) => void;
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleResizeStart: (
      e: React.MouseEvent<any>,
      pid: number,
      dimension: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
                E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE
    ) => {
      dispatch(resizeStart(pid, dimension, e.clientX, e.clientY))
    }
  };
};

export default connect<{}, WMDispatch, WMOwnProps>(
  null,
  mapDispatchToProps
)(WindowMargin);