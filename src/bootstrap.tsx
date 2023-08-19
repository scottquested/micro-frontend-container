import App from 'App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('micro-frontend-container');

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
