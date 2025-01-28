import { OverlayState, OverlayAction } from './types';

export const initialState: OverlayState = {
  stack: [],
};

export const overlayReducer = (state: OverlayState, action: OverlayAction): OverlayState => {
  switch (action.type) {
    case 'PUSH':
      return {
        ...state,
        stack: [...state.stack, action.payload],
      };

    case 'POP':
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      };

    case 'REMOVE':
      return {
        ...state,
        stack: state.stack.filter((item) => item.overlayKey !== action.payload.overlayKey),
      };

    case 'CLEAR':
      return {
        ...state,
        stack: [],
      };

    default:
      return state;
  }
};
