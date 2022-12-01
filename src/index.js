import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* Alerta por única vez */}
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>¡Atención!</strong> Este sitio es aún muy sensible. Por favor, no romper nada. Si desea poner a prueba validaciones hágalo en otro sitio. Gracias.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <App />
  </React.StrictMode>
);