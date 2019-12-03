import * as React from "react";
import { connect } from "react-redux";

import { focusWin } from "../actions";
import TitleBar from "./title-bar";
import WindowMargin from "./window-margin";
import {
  MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT,
  MARGIN_TOP_LEFT, MARGIN_TOP_RIGHT, MARGIN_BOTTOM_LEFT, MARGIN_BOTTOM_RIGHT,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE
} from "../constants";
import { Rect } from "../programs";

interface WindowOwnProps {
  pid: number;
  program: React.ReactNode;
  title: string;
  pos: Rect;
  zIndex: number;
  canResizeH: boolean;
  canResizeV: boolean;
  isDragged: boolean;
  isVisible: boolean;
  isResized: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
             E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE |
             null;
  hasFocus: boolean;
}

interface WindowProps extends WindowOwnProps {
  handleWinFocus: (e: React.MouseEvent<any>, pid: number) => void;
}

class Window extends React.Component<WindowProps, {}> {
  shouldComponentUpdate(nextProps: WindowProps) {
    return this.props.pos.x1 !== nextProps.pos.x1 ||
           this.props.pos.x2 !== nextProps.pos.x2 ||
           this.props.pos.y1 !== nextProps.pos.y1 ||
           this.props.pos.y2 !== nextProps.pos.y2 ||
           this.props.zIndex !== nextProps.zIndex ||
           this.props.hasFocus !== nextProps.hasFocus ||
           this.props.isDragged !== nextProps.isDragged ||
           this.props.isResized !== nextProps.isResized ||
           this.props.isVisible !== nextProps.isVisible;
  }

  render() {
    let {
      pid, program, title, pos, zIndex, canResizeH, canResizeV, isDragged,
      isVisible, isResized, hasFocus, handleWinFocus
    } = this.props;
    let classes = "window";

    if (isDragged)
      classes += " dragged";
    if (!isVisible)
      classes += " hidden";

    return (
      <div
        className={classes}
        id={"win#" + pid}
        style={{
          transform: `translate3D(${pos.x1}px, ${pos.y1}px, 0px)`,
          width: pos.x2 - pos.x1,
          height: pos.y2 - pos.y1,
          zIndex
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleWinFocus(e, pid);
        }}
      >
        <WindowMargin
          pid={pid}
          type={MARGIN_TOP}
          canResize={canResizeV}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_LEFT}
          canResize={canResizeH}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_RIGHT}
          canResize={canResizeH}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_BOTTOM}
          canResize={canResizeV}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_TOP_LEFT}
          canResize={canResizeH && canResizeV}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_TOP_RIGHT}
          canResize={canResizeH && canResizeV}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_BOTTOM_LEFT}
          canResize={canResizeH && canResizeV}
        />
        <WindowMargin
          pid={pid}
          type={MARGIN_BOTTOM_RIGHT}
          canResize={canResizeH && canResizeV}
        />
        <TitleBar
          title={title}
          pid={pid}
          hasFocus={hasFocus}
        />
        {program}
      </div>
    );
  }
};

interface WindowDispatch {
  handleWinFocus: (e: React.MouseEvent<any>, pid: number) => void;
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleWinFocus: (e: React.MouseEvent<any>, pid: number): void => {
      dispatch(focusWin(pid));
    }
  }
}

export default connect<{}, WindowDispatch, WindowOwnProps>(
  null,
  mapDispatchToProps
)(Window);