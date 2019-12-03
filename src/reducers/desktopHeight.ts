import { LAYOUT } from "../constants";

import { LayoutAction } from "../actions";

const defaultState = window.innerHeight;

export default function(
  state = defaultState,
  action: LayoutAction
) {
  switch (action.type) {
    case LAYOUT:
      return action.height;
    default:
      return state;
  };
};