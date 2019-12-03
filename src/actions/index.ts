import {
  LAYOUT,
  OPEN_PROG, HIDE_PROG, CLOSE_PROG,
  FOCUS_WIN, UNFOCUS_WIN,
  DRAG_WIN_START, DRAG_WIN_MOVE, DRAG_WIN_END,
  RESIZE_WIN_START, RESIZE_WIN_MOVE, RESIZE_WIN_END,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE
} from "../constants";
import { newPrgArgs } from "../programs";

export type LayoutAction = {
  type: LAYOUT;
  width: number;
  height: number;
};

export function layout(width: number, height: number): LayoutAction {
  return {
    type: LAYOUT,
    width,
    height
  };
}

// Program
export type OpenProgAction = {
  type: OPEN_PROG;
  args: newPrgArgs
};

export function openProg(args: newPrgArgs): OpenProgAction {
  return {
    type: OPEN_PROG,
    args
  };
};

export type HideProgAction = {
  type: HIDE_PROG;
  pid: number;
};

export function hideProg(pid: number): HideProgAction {
  return {
    type: HIDE_PROG,
    pid
  };
};

export type CloseProgAction = {
  type: CLOSE_PROG;
  pid: number;
};

export function closeProg(pid: number): CloseProgAction {
  return {
    type: CLOSE_PROG,
    pid
  };
};

// Focus
export type FocusWinAction = {
  type: FOCUS_WIN;
  pid: number;
};

export function focusWin(pid: number): FocusWinAction {
  return {
    type: FOCUS_WIN,
    pid
  };
};

export type UnfocusWinAction = {
  type: UNFOCUS_WIN;
};

export function unfocusWin(): UnfocusWinAction {
  return {
    type: UNFOCUS_WIN
  };
};

// Drag
export type DragStartAction = {
  type: DRAG_WIN_START;
  pid: number;
  deltaX: number;
  deltaY: number;
};

export function dragStart(pid: number, deltaX: number, deltaY: number): DragStartAction {
  return {
    type: DRAG_WIN_START,
    pid,
    deltaX,
    deltaY
  };
};

export type DragMoveAction = {
  type: DRAG_WIN_MOVE;
  x: number;
  y: number;
};

export function dragMove(x: number, y: number): DragMoveAction {
  return {
    type: DRAG_WIN_MOVE,
    x,
    y
  };
};

export type DragEndAction = {
  type: DRAG_WIN_END;
};

export function dragEnd(): DragEndAction {
  return {
    type: DRAG_WIN_END
  };
};

// Resize
export type ResizeStartAction = {
  type: RESIZE_WIN_START;
  dimension: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
             E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE;
  pid: number;
  deltaX: number;
  deltaY: number;
};

export function resizeStart(
  pid: number,
  dimension: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
             E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE,
  deltaX: number,
  deltaY: number
): ResizeStartAction {
  return {
    type: RESIZE_WIN_START,
    pid,
    dimension,
    deltaX,
    deltaY
  };
};

export type ResizeMoveAction = {
  type: RESIZE_WIN_MOVE;
  x: number;
  y: number;
};

export function resizeMove(x: number, y: number): ResizeMoveAction {
  return {
    type: RESIZE_WIN_MOVE,
    x,
    y
  };
};

export type ResizeEndAction = {
  type: RESIZE_WIN_END;
};

export function resizeEnd(): ResizeEndAction {
  return {
    type: RESIZE_WIN_END
  };
};