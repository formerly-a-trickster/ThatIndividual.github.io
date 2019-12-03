import {
  NOTEPAD, RESUME, GAMEOFLIFE, TETRIS, MAZEGEN, MUSICPLAYER,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE
} from "./constants";
import { defArg } from "./utils";

export interface GenericPrg {
  pid: number;
  entityOf: any;
  title: string;
  window: Window;
};

export interface Rect {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface Window {
  pos: Rect;
  deltaPos: Rect;
  zIndex: number;
  canResizeH: boolean;
  canResizeV: boolean;
  isDragged: boolean;
  isResized: NV_WIN_RESIZE | N_WIN_RESIZE | NE_WIN_RESIZE | V_WIN_RESIZE |
             E_WIN_RESIZE | SV_WIN_RESIZE | S_WIN_RESIZE | SE_WIN_RESIZE |
             null;
  isVisible: boolean;
  hasFocus: boolean;
}

export interface newPrgArgs {
  pid: number,
  entityOf: NOTEPAD | RESUME | GAMEOFLIFE | TETRIS | MAZEGEN | MUSICPLAYER,
  title?: string,
  x?: number,
  y?: number,
  z?: number,
  width?: number,
  height?: number,
  canResizeH?: boolean,
  canResizeV?: boolean
};

export function newProgram({
  pid, entityOf, title, x, y, z, width, height, canResizeH, canResizeV
}: newPrgArgs): GenericPrg {
  return {
    pid: pid,
    entityOf: defArg(entityOf, null),
    title: defArg(title, "genericPrg"),
    window: {
      pos: {
        x1: defArg(x, 0),
        x2: defArg(x, 0) + defArg(width, 300),
        y1: defArg(y, 0),
        y2: defArg(y, 0) + defArg(height, 200)
      },
      deltaPos: { x1: null, x2: null, y1: null, y2: null },
      zIndex: defArg(z, 0),
      canResizeH: defArg(canResizeH, false),
      canResizeV: defArg(canResizeV, false),
      isDragged: false,
      isResized: null,
      isVisible: true,
      hasFocus: true
    }
  };
};