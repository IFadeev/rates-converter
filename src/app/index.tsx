import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import AppRoutes from './routes';
import { HashRouter as Router } from 'react-router-dom';
import '@/shared/styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router>
          <AppRoutes />
        </Router>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
