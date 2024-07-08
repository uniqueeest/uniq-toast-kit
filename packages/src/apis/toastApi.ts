let toastFunction: ({ title, description }: { title: string; description: string }) => void;

export const setToastFunction = (fn: ({ title, description }: { title: string; description: string }) => void) => {
  toastFunction = fn;
};

export const toastApi = {
  create: (params: { title: string; description: string }) => {
    if (toastFunction) {
      toastFunction({ title: params.title, description: params.description });
    }
  },
};
