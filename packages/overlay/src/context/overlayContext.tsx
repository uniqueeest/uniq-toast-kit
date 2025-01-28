import { ReactNode } from 'react';

import { useCreateOverlayContainer } from './useCreateOverlayContainer';
import { OverlayRenderer } from './OverlayRenderer';

export const OverlayContext = ({ children }: { children: ReactNode }) => {
  useCreateOverlayContainer();

  return (
    <>
      {children}
      <OverlayRenderer />
    </>
  );
};
