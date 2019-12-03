export type LAYOUT = "app/LAYOUT";
export const LAYOUT: LAYOUT = "app/LAYOUT";

// Program actions
export type OPEN_PROG = "prg/OPEN";
export const OPEN_PROG: OPEN_PROG = "prg/OPEN";

export type HIDE_PROG = "prg/HIDE";
export const HIDE_PROG: HIDE_PROG = "prg/HIDE";

export type CLOSE_PROG = "prg/CLOSE";
export const CLOSE_PROG: CLOSE_PROG = "prg/CLOSE";

// Window focus
export type UNFOCUS_WIN = "win/UNFOCUS";
export const UNFOCUS_WIN: UNFOCUS_WIN = "win/UNFOCUS";

export type FOCUS_WIN = "win/FOCUS";
export const FOCUS_WIN: FOCUS_WIN = "win/FOCUS";

// Window drag
export type DRAG_WIN_START = "win/DRAG_START";
export const DRAG_WIN_START: DRAG_WIN_START = "win/DRAG_START";

export type DRAG_WIN_MOVE = "win/DRAG_MOVE"
export const DRAG_WIN_MOVE: DRAG_WIN_MOVE = "win/DRAG_MOVE";

export type DRAG_WIN_END = "win/DRAG_END";
export const DRAG_WIN_END: DRAG_WIN_END = "win/DRAG_END";

// Window resize
export type RESIZE_WIN_START = "win/RESIZE_START";
export const RESIZE_WIN_START: RESIZE_WIN_START = "win/RESIZE_START";

export type RESIZE_WIN_MOVE = "win/RESIZE_MOVE"
export const RESIZE_WIN_MOVE: RESIZE_WIN_MOVE = "win/RESIZE_MOVE";

export type RESIZE_WIN_END = "win/RESIZE_END";
export const RESIZE_WIN_END: RESIZE_WIN_END = "win/RESIZE_END";

// Window resize directions
export type NV_WIN_RESIZE = "win/RESIZE_NV";
export const NV_WIN_RESIZE: NV_WIN_RESIZE = "win/RESIZE_NV";

export type N_WIN_RESIZE = "win/RESIZE_N";
export const N_WIN_RESIZE: N_WIN_RESIZE = "win/RESIZE_N";

export type NE_WIN_RESIZE = "win/RESIZE_NE";
export const NE_WIN_RESIZE: NE_WIN_RESIZE = "win/RESIZE_NE";

export type V_WIN_RESIZE = "win/RESIZE_V";
export const V_WIN_RESIZE: V_WIN_RESIZE = "win/RESIZE_V";

export type E_WIN_RESIZE = "win/RESIZE_E";
export const E_WIN_RESIZE: E_WIN_RESIZE = "win/RESIZE_E";

export type SV_WIN_RESIZE = "win/RESIZE_SV";
export const SV_WIN_RESIZE: SV_WIN_RESIZE = "win/RESIZE_SV";

export type S_WIN_RESIZE = "win/RESIZE_S";
export const S_WIN_RESIZE: S_WIN_RESIZE = "win/RESIZE_S";

export type SE_WIN_RESIZE = "win/RESIZE_SE";
export const SE_WIN_RESIZE: SE_WIN_RESIZE = "win/RESIZE_SE";

// Program types
export type NOTEPAD = "ent/NOTEPAD";
export const NOTEPAD: NOTEPAD = "ent/NOTEPAD";

export type RESUME = "ent/RESUME";
export const RESUME: RESUME = "ent/RESUME";

export type TETRIS = "ent/TETRIS";
export const TETRIS: TETRIS = "ent/TETRIS";

export type GAMEOFLIFE = "ent/GAMEOFLIFE";
export const GAMEOFLIFE: GAMEOFLIFE = "ent/GAMEOFLIFE";

export type MAZEGEN = "ent/MAZEGEN";
export const MAZEGEN: MAZEGEN = "ent/MAZEGEN";

export type MUSICPLAYER = "ent/MUSICPLAYER";
export const MUSICPLAYER: MUSICPLAYER = "ent/MUSICPLAYER";

// Margin types
export const MARGIN_TOP: MARGIN_TOP = "mar/TOP";
export const MARGIN_BOTTOM: MARGIN_BOTTOM = "mar/BOTTOM";
export const MARGIN_LEFT: MARGIN_LEFT = "mar/LEFT";
export const MARGIN_RIGHT: MARGIN_RIGHT = "mar/RIGHT";

export type MARGIN_TOP = "mar/TOP";
export type MARGIN_BOTTOM = "mar/BOTTOM";
export type MARGIN_LEFT = "mar/LEFT";
export type MARGIN_RIGHT = "mar/RIGHT";

export type MARGIN_STRAIGHT = MARGIN_TOP | MARGIN_BOTTOM | MARGIN_LEFT | MARGIN_RIGHT;

export const MARGIN_TOP_LEFT: MARGIN_TOP_LEFT = "mar/TOP_LEFT";
export const MARGIN_TOP_RIGHT: MARGIN_TOP_RIGHT = "mar/TOP_RIGHT";
export const MARGIN_BOTTOM_LEFT: MARGIN_BOTTOM_LEFT = "mar/MARGIN_BOTTOM_LEFT";
export const MARGIN_BOTTOM_RIGHT: MARGIN_BOTTOM_RIGHT = "mar/BOTTOM_RIGHT";

export type MARGIN_TOP_LEFT = "mar/TOP_LEFT";
export type MARGIN_TOP_RIGHT = "mar/TOP_RIGHT";
export type MARGIN_BOTTOM_LEFT = "mar/MARGIN_BOTTOM_LEFT";
export type MARGIN_BOTTOM_RIGHT = "mar/BOTTOM_RIGHT";

export type MARGIN_CORNER = MARGIN_TOP_LEFT | MARGIN_TOP_RIGHT | MARGIN_BOTTOM_LEFT | MARGIN_BOTTOM_RIGHT;