import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <Toaster position="top-right" expand={true} richColors />
  </StrictMode>,
);
