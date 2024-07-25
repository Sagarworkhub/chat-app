import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import SocketProvider from './context/SocketContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>,
);
