import { LAYOUT } from "../constants";

import { LayoutAction } from "../actions";

const defaultState = window.innerWidth;

export default function(
  state = defaultState,
  action: LayoutAction
) {
  switch (action.type) {
    case LAYOUT:
      return action.width;
    default:
      return state;
  };
};