import { DRAG_WIN_START, DRAG_WIN_END } from "../constants";

import {
  DragStartAction,
  DragMoveAction,
  DragEndAction
} from "../actions";


export default function(
  state: boolean = false,
  action: DragStartAction | DragMoveAction | DragEndAction
) {
  switch (action.type) {
    case DRAG_WIN_START:
      return true;
    case DRAG_WIN_END:
      return false;
    default:
      return state;
  };
};