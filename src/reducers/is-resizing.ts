import { RESIZE_WIN_START, RESIZE_WIN_END } from "../constants";

import {
  ResizeStartAction,
  ResizeMoveAction,
  ResizeEndAction
} from "../actions";


export default function(
  state: boolean = false,
  action: ResizeStartAction | ResizeMoveAction | ResizeEndAction
) {
  switch (action.type) {
    case RESIZE_WIN_START:
      return true;
    case RESIZE_WIN_END:
      return false;
    default:
      return state;
  };
};