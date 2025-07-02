import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DirectionProvider } from '@radix-ui/react-direction';
import './global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DirectionProvider dir="rtl">
            <App />
        </DirectionProvider>
    </StrictMode>,
);
