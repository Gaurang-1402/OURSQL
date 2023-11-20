import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import CrimeDetailPage from './pages/CrimeDetailPage';

import CriminalSearchPage from './pages/CriminalSearchPage';
import CriminalDetailPage from './pages/CriminalDetailPage';

import OfficerSearchPage from './pages/OfficerSearchPage';
import OfficerDetailPage from './pages/OfficerDetailPage';

import ProbationOfficerSearchPage from './pages/ProbationOfficerSearchPage';
import ProbationOfficerDetailPage from './pages/ProbationOfficerDetailPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path="/crime/search" element={<CrimeSearchPage />}/>
      <Route path="/crime/:id" element={<CrimeDetailPage />}/>

      <Route path="/criminal/search" element={<CriminalSearchPage />}/>
      <Route path="/criminal/:id" element={<CriminalDetailPage />}/>

      <Route path="/officer/search" element={<OfficerSearchPage />}/>
      <Route path="/officer/:id" element={<OfficerDetailPage />}/>

      <Route path="/probation-officer/search" element={<ProbationOfficerSearchPage />}/>
      <Route path="/probation-officer/:id" element={<ProbationOfficerDetailPage />}/>

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
