import { BrowserRouter as Router } from 'react-router-dom';
import { ImageProvider } from './Context/ImageContext';
import AuthProvider from './Context/AuthContext';
import AppRoutes from './AppRoutes';
import ToastProvider from './lib/ToastProvider';
function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router>
          <AppRoutes />
          <ToastProvider />
        </Router>
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;
