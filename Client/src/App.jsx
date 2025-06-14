import { BrowserRouter as Router } from 'react-router-dom';
import GlobalProvider from './Context/GlobalState';
import AuthProvider from './Context/AuthContext';
import AppRoutes from './AppRoutes';
import ToastProvider from './lib/ToastProvider';
function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <AppRoutes />
          <ToastProvider />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
