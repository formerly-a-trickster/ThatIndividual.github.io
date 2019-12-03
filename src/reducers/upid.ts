import { OpenProgAction } from "../actions";
import { OPEN_PROG } from "../constants";

export default function(state = 10, action: OpenProgAction) {
  switch (action.type) {
    case OPEN_PROG:
      return state + 1;

    default:
      return state;
  }
};