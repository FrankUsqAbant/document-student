import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ensure darkreader-lock is present to prevent browser extensions from inverting colors
if (typeof document !== 'undefined' && !document.querySelector('meta[name="darkreader-lock"]')) {
  const meta = document.createElement('meta');
  meta.name = 'darkreader-lock';
  document.head.appendChild(meta);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
