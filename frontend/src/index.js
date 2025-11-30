import React from 'react';
import ReactDOM from 'react-dom/client';
import { selectedProjectName } from '../src/auth/index';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

if(selectedProjectName() === "maps"){
  import('./maps-style.css');
}
else{
  import('./wildarts-style.css');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
