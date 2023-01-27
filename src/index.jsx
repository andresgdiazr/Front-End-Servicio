// => index.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './routes/Users';
import Posts from './routes/Posts';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="users" element={<Users/>} />
         <Route path ="posts" element={<Posts />} />
          <Route path="*" element={<h1>Route does not 
            exist</h1>}/>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
