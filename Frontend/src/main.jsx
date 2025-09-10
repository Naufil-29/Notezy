import { StrictMode } from 'react';
import { createRoot, } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/theme-Provider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
     <BrowserRouter> 
      <App />
      <Toaster />
     </BrowserRouter>
    </ThemeProvider>    
  </StrictMode>,
)
