import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      containerStyle={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        position: 'fixed',
        zIndex: 9999,
      }}
    />
  );
}
