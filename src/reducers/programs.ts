import {
  LayoutAction,
  OpenProgAction, HideProgAction, CloseProgAction,
  FocusWinAction, UnfocusWinAction,
  DragStartAction, DragMoveAction, DragEndAction,
  ResizeStartAction, ResizeMoveAction, ResizeEndAction
} from "../actions";
import {
  LAYOUT,
  OPEN_PROG, HIDE_PROG, CLOSE_PROG,
  FOCUS_WIN, UNFOCUS_WIN,
  DRAG_WIN_START, DRAG_WIN_MOVE, DRAG_WIN_END,
  RESIZE_WIN_START, RESIZE_WIN_MOVE, RESIZE_WIN_END,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE,
  NOTEPAD, RESUME
} from "../constants";
import { Dict, mapDict, filterDict, lenDict } from "../utils";
import { GenericPrg, newProgram } from "../programs";

export default function(
  state: Dict<GenericPrg> = {},
  action: LayoutAction |
          OpenProgAction | HideProgAction | CloseProgAction |
          FocusWinAction | UnfocusWinAction |
          DragStartAction | DragMoveAction | DragEndAction |
          ResizeStartAction | ResizeMoveAction | ResizeEndAction
): Dict<GenericPrg> {
  switch (action.type) {
    case LAYOUT:
      return mapDict(state, prg => {
        let newX1 = prg.window.pos.x1,
            newY1 = prg.window.pos.y1,
            width = prg.window.pos.x2 - prg.window.pos.x1,
            height = prg.window.pos.y2 - prg.window.pos.y1;

        if (prg.window.pos.x2 > action.width) {
          newX1 = Math.max(action.width - width, 0);
        }

        if (prg.window.pos.y2 > action.height - 28) {
          newY1 = Math.max(action.height - height, 0);
        }

        return {
          ...prg,
          window: {
            ...prg.window,
            pos: {
              ...prg.window.pos,
              x1: newX1,
              x2: newX1 + width,
              y1: newY1,
              y2: newY1 + height
            }
          }
        };
      });

    case OPEN_PROG:
      const otherPrg = mapDict(state, prg => ({
        ...prg,
        window: {
          ...prg.window,
          hasFocus: false
        }
      }));

      return {
        ...otherPrg,
        [action.args.pid]: newProgram({
          ...action.args,
          z: lenDict(state)
        })
      };

    case HIDE_PROG:
      return mapDict(state, prg => {
        if (prg.pid === action.pid) {
          return {
            ...prg,
            window: {
              ...prg.window,
              isVisible: false,
              hasFocus: false
            }
          };
        }
        else
          return prg;
      });

    case CLOSE_PROG:
      const closedWinZ = state[action.pid].window.zIndex;

      let filteredState = filterDict(state, prg => prg.pid !== action.pid);

      return mapDict(filteredState, prg => {
        if (prg.window.zIndex > closedWinZ) {
          return {
            ...prg,
            window: {
              ...prg.window,
              zIndex: prg.window.zIndex - 1
            }
          }
        }
        else
          return prg;
      });

    case FOCUS_WIN:
      const focusedWinZ = state[action.pid].window.zIndex,
            topmostZ = lenDict(state) - 1;

      return mapDict(state, prg => {
        if (prg.window.zIndex === focusedWinZ)
          return {
            ...prg,
            window: {
              ...prg.window,
              zIndex: topmostZ,
              isVisible: true,
              hasFocus: true
            }
          }
        else if (prg.window.zIndex < focusedWinZ)
          return {
            ...prg,
            window: {
              ...prg.window,
              hasFocus: false
            }
          };
        else if (prg.window.zIndex > focusedWinZ)
          return {
            ...prg,
            window: {
              ...prg.window,
              zIndex: prg.window.zIndex - 1,
              hasFocus: false,
            }
          };
        else
          return {
            ...prg,
            window: {
              ...prg.window,
              zIndex: 0,
              hasFocus: false
            }
          };
      });

    case UNFOCUS_WIN:
      return mapDict(state, prg => ({
        ...prg,
        window: {
          ...prg.window,
          hasFocus: false
        }
      }));

    case DRAG_WIN_START:
      return mapDict(state, prg => {
        if (prg.pid === action.pid) {
          return {
            ...prg,
            window: {
              ...prg.window,
              isDragged: true,
              deltaPos: {
                x1: prg.window.pos.x1 - action.deltaX,
                y1: prg.window.pos.y1 - action.deltaY,
                x2: prg.window.pos.x2 - action.deltaX,
                y2: prg.window.pos.y2 - action.deltaY
              }
            }
          };
        }
        else
          return prg;
      });

    case DRAG_WIN_MOVE:
      return mapDict(state, prg => {
        if (prg.window.isDragged) {
          return {
            ...prg,
            window: {
              ...prg.window,
              pos: {
                x1: action.x + prg.window.deltaPos.x1,
                y1: action.y + prg.window.deltaPos.y1,
                x2: action.x + prg.window.deltaPos.x2,
                y2: action.y + prg.window.deltaPos.y2
              }
            }
          };
        }
        else
          return prg;
      });

    case DRAG_WIN_END:
      return mapDict(state, prg => {
        if (prg.window.isDragged) {
          return {
            ...prg,
            window: {
              ...prg.window,
              isDragged: false,
              deltaPos: { x1: null, y1: null, x2: null, y2: null }
            }
          };
        }
        else
          return prg;
      });

    case RESIZE_WIN_START:
      return mapDict(state, prg => {
        if (prg.pid === action.pid) {
          return {
            ...prg,
            window: {
              ...prg.window,
              isResized: action.dimension,
              deltaPos: {
                x1: prg.window.pos.x1 - action.deltaX,
                y1: prg.window.pos.y1 - action.deltaY,
                x2: prg.window.pos.x2 - action.deltaX,
                y2: prg.window.pos.y2 - action.deltaY
              }
            }
          };
        }
        else
          return prg;
      });
    
    case RESIZE_WIN_MOVE:
      return mapDict(state, prg => {
        const newY1 = action.y + prg.window.deltaPos.y1,
              newX1 = action.x + prg.window.deltaPos.x1,
              newX2 = action.x + prg.window.deltaPos.x2,
              newY2 = action.y + prg.window.deltaPos.y2;

        switch (prg.window.isResized) {
          case N_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  y1: prg.window.pos.y2 - newY1 > 100 ?
                      newY1 :
                      prg.window.pos.y2 - 100
                }
              }
            };

          case V_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x1: prg.window.pos.x2 - newX1 > 100 ?
                      newX1 :
                      prg.window.pos.x2 - 100
                }
              }
            };

          case E_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x2: newX2 - prg.window.pos.x1 > 100 ?
                      newX2 :
                      prg.window.pos.x1 + 100
                }
              }
            };

          case S_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  y2: newY2 - prg.window.pos.y1 > 100 ?
                      newY2 :
                      prg.window.pos.y1 + 100
                }
              }
            };

          case NV_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x1: prg.window.pos.x2 - newX1 > 100 ?
                      newX1 :
                      prg.window.pos.x2 - 100,
                  y1: prg.window.pos.y2 - newY1 > 100 ?
                      newY1 :
                      prg.window.pos.y2 - 100
                }
              }
            };

          case NE_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x2: newX2 - prg.window.pos.x1 > 100 ?
                      newX2 :
                      prg.window.pos.x1 + 100,
                  y1: prg.window.pos.y2 - newY1 > 100 ?
                      newY1 :
                      prg.window.pos.y2 - 100
                }
              }
            };

          case SV_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x1: prg.window.pos.x2 - newX1 > 100 ?
                      newX1 :
                      prg.window.pos.x2 - 100,
                  y2: newY2 - prg.window.pos.y1 > 100 ?
                      newY2 :
                      prg.window.pos.y1 + 100
                }
              }
            };

          case SE_WIN_RESIZE:
            return {
              ...prg,
              window: {
                ...prg.window,
                pos: {
                  ...prg.window.pos,
                  x2: newX2 - prg.window.pos.x1 > 100 ?
                      newX2 :
                      prg.window.pos.x1 + 100,
                  y2: newY2 - prg.window.pos.y1 > 100 ?
                      newY2 :
                      prg.window.pos.y1 + 100
                }
              }
            };

          default:
            return prg;
        }
      });

    case RESIZE_WIN_END:
      return mapDict(state, prg => {
        if (prg.window.isResized) {
          return {
            ...prg,
            window: {
              ...prg.window,
              deltaPos: { x1: null, y1: null, x2: null, y2: null },
              isResized: null
            }
          };
        }
        else
          return prg;
      });

    default:
      return state;
  }
};