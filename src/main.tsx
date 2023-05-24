import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import 'tailwindcss/tailwind.css';
import './styles/main.scss';

import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
