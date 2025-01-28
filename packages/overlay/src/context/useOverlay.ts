import { useState, useEffect } from 'react';

import { overlayStore } from './store';

export const useOverlay = () => {
  const [overlays, setOverlays] = useState(overlayStore.getAllOverlays());

  useEffect(() => {
    const unsubscribe = overlayStore.subscribe(() => {
      setOverlays(overlayStore.getAllOverlays());
    });

    return () => unsubscribe();
  }, []);

  return overlays;
};
