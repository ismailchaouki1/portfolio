import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import App from './App';
import { LenisProvider } from './components/LenisProvider';

createRoot(document.getElementById('root')).render(
  <LenisProvider>
    <App />
  </LenisProvider>
);
