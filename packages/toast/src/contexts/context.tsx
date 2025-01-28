import * as React from 'react';
import { createContext, useState, useContext, useCallback } from 'react';
import { randomId } from '../utils';

export type OverlayListType = {
  id: string;
  title: string;
  description: string;
};

export type ToastContextType = {
  showToast: ({ title, description, duration }: { title: string; description: string; duration?: number }) => void;
  hideToast: (id: string) => void;
  overlayList: OverlayListType[];
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [overlayList, setOverlayList] = useState<OverlayListType[]>([]);

  const showToast = useCallback(
    ({ title, description, duration = 3000 }: { title: string; description: string; duration?: number }) => {
      const id = randomId();
      setOverlayList((prev) => [
        ...prev,
        {
          id,
          title,
          description,
        },
      ]);

      // 제거 로직
      setTimeout(() => hideToast(id), duration);
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setOverlayList((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return <ToastContext.Provider value={{ showToast, hideToast, overlayList }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
