import toast from 'react-hot-toast';

/**
 * Show a success toast notification
 */
export const showSuccess = (message: string) => {
    toast.success(message, {
        duration: 3000,
        position: 'top-right',
        style: {
            background: '#10B981',
            color: '#fff',
        },
    });
};

/**
 * Show an error toast notification
 */
export const showError = (message: string) => {
    toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#EF4444',
            color: '#fff',
        },
    });
};

/**
 * Show an info toast notification
 */
export const showInfo = (message: string) => {
    toast(message, {
        duration: 3000,
        position: 'top-right',
        icon: 'ℹ️',
        style: {
            background: '#3B82F6',
            color: '#fff',
        },
    });
};

/**
 * Show a loading toast notification
 */
export const showLoading = (message: string) => {
    return toast.loading(message, {
        position: 'top-right',
    });
};

/**
 * Dismiss a specific toast or all toasts
 */
export const dismissToast = (toastId?: string) => {
    if (toastId) {
        toast.dismiss(toastId);
    } else {
        toast.dismiss();
    }
};
