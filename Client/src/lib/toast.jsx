import { toast } from 'react-hot-toast';

const CustomToast = ({ t, message, type }) => {
  const base = 'px-6 py-4 rounded-lg shadow-lg text-center text-white text-xl';
  const color = {
    success: 'bg-indigo-300',
    error: 'bg-red-300',
    info: 'bg-blue-300',
  }[type];

  return (
    <div className={`${base} ${color} ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
      {type === 'success' && '✅'} {type === 'error' && '❌'} {type === 'info' && 'ℹ️'} {message}
    </div>
  );
};

export const showSuccessToast = (message, duration = 3000) =>
  toast.custom((t) => <CustomToast t={t} message={message} type="success" />, { duration });

export const showErrorToast = (message, duration = 3000) =>
  toast.custom((t) => <CustomToast t={t} message={message} type="error" />, { duration });

export const showInfoToast = (message, duration = 3000) =>
  toast.custom((t) => <CustomToast t={t} message={message} type="info" />);
