import { cloneElement, isValidElement } from 'react';

import { overlayStore } from './store';
import { randomId } from '../utils';
import { OverlayProps, ReactOverlayElement } from './types';

function open<T>(element: ReactOverlayElement): Promise<T> {
  if (!isValidElement(element)) {
    throw new Error('Invalid React element provided to overlay.open');
  }

  const { overlayKey = randomId(), duration, ...props } = element.props;

  const OverlayComponent = (overlayProps: OverlayProps) => {
    return cloneElement(element, { ...overlayProps, ...props });
  };

  return overlayStore.push(overlayKey, OverlayComponent, {
    ...props,
    duration,
  }) as Promise<T>;
}

export const overlay = {
  open,
  close: () => overlayStore.pop(),
  remove: (overlayKey: string) => overlayStore.remove(overlayKey),
  clear: () => overlayStore.clear(),
};
