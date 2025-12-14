import { toaster } from "@/utils/toaster";

const useCustomToast = () => {

  const showToast = (
    description: string,
    status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
  ) => {

    toaster.create({
      description: description,
      type: status,
    })
  };

  return showToast;
};

export default useCustomToast;
