import { combineReducers } from "redux";

import upid from "./upid";
import desktopWidth from "./desktopWidth";
import desktopHeight from "./desktopHeight";
import isDragging from "./is-dragging";
import isResizing from "./is-resizing";
import programs from "./programs";

export default combineReducers({
  upid,
  desktopWidth,
  desktopHeight,
  isDragging,
  isResizing,
  programs
});