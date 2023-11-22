import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/bootstrap.custom.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import HomePage from './pages/HomePage';
import CrimeSearchPage from './pages/CrimeSearchPage';

import CriminalSearchPage from './pages/CriminalSearchPage';

import OfficerSearchPage from './pages/OfficerSearchPage';

import ProbationOfficerSearchPage from './pages/ProbationOfficerSearchPage';
import { Provider } from 'react-redux';

import store from './store'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path="/crime/search" element={<CrimeSearchPage />}/>

      <Route path="/criminal/search" element={<CriminalSearchPage />}/>

      <Route path="/officer/search" element={<OfficerSearchPage />}/>

      <Route path="/probation-officer/search" element={<ProbationOfficerSearchPage />}/>

      </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
