import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from "react-router-dom";
import { VitalSave } from './VitalSave';

// Archivos CSS
import "../src/assets/scss/paper-dashboard.scss";
import "perfect-scrollbar/css/perfect-scrollbar.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <VitalSave />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
