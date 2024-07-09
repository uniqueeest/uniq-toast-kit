import { useEffect } from 'react';

import { useToast } from './context';
import { setToastFunction } from '../apis';

export const ToastInitializer = () => {
  const { showToast } = useToast();

  useEffect(() => {
    setToastFunction(showToast);
  }, [showToast]);

  return null;
};
