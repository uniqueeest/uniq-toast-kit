import type { OverlayType, OverlayProps, OverlayAction, OverlayState, Subscriber } from './types';
import { overlayReducer, initialState } from './reducer';

const createOverlayStore = () => {
  let state: OverlayState = initialState;
  const subscribers = new Set<Subscriber>();

  const dispatch = (action: OverlayAction) => {
    state = overlayReducer(state, action);
    notifySubscribers();
  };

  const subscribe = (subscriber: Subscriber) => {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  };

  const notifySubscribers = () => {
    subscribers.forEach((subscriber) => subscriber());
  };

  const getCurrentOverlay = () => {
    return state.stack[state.stack.length - 1];
  };

  const getAllOverlays = () => {
    return state.stack;
  };

  const push = (overlayKey: string, overlay: OverlayType, props: Omit<OverlayProps, 'resolve'>) => {
    const existingOverlay = state.stack.find((item) => item.overlayKey === overlayKey);

    if (existingOverlay) {
      console.warn(`Overlay with key "${overlayKey}" already exists. Not adding a duplicate.`);
      return Promise.reject(`Duplicate overlay key: ${overlayKey}`);
    }

    return new Promise((resolve) => {
      const overlayItem = {
        overlayKey,
        overlay,
        props,
        resolve: (value: unknown) => {
          resolve(value);
          dispatch({ type: 'REMOVE', payload: { overlayKey } });
        },
      };

      dispatch({ type: 'PUSH', payload: overlayItem });

      if (props.duration && props.duration > 0) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE', payload: { overlayKey } });
        }, props.duration);
      }
    });
  };

  const pop = () => {
    const current = getCurrentOverlay();
    if (current) {
      current.resolve('Overlay closed');
      dispatch({ type: 'POP' });
    }
  };

  const remove = (overlayKey: string) => {
    const overlay = state.stack.find((item) => item.overlayKey === overlayKey);
    if (overlay) {
      overlay.resolve('Overlay removed');
      dispatch({ type: 'REMOVE', payload: { overlayKey } });
    }
  };

  const clear = () => {
    state.stack.forEach((overlay) => {
      overlay.resolve('Overlay cleared');
    });
    dispatch({ type: 'CLEAR' });
  };

  const getState = () => state;

  return {
    getState,
    getCurrentOverlay,
    getAllOverlays,
    push,
    pop,
    remove,
    clear,
    subscribe,
  };
};

export const overlayStore = createOverlayStore();
