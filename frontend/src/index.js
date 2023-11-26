import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/bootstrap.custom.css'
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';

import CrimeSearchPage from './pages/CrimeSearchPage';
import CriminalSearchPage from './pages/CriminalSearchPage';
import OfficerSearchPage from './pages/OfficerSearchPage';
import ProbationOfficerSearchPage from './pages/ProbationOfficerSearchPage';
import SentenceSearchPage from './pages/SentenceSearchPage';
import AppealSearchPage from './pages/AppealSearchPage';
import CrimeChargeSearchPage from './pages/CrimeChargeSearchPage';


import CrimePage from './pages/CrimePage';
import CriminalPage from './pages/CriminalPage';
import OfficerPage from './pages/OfficerPage';
import ProbationOfficerPage from './pages/ProbationOfficerPage';
import SentencePage from './pages/SentencePage';
import AppealPage from './pages/AppealPage';
import CrimeChargePage from './pages/CrimeChargePage';


import { Provider } from 'react-redux';

import store from './store'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminRoute from './components/AdminRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


      <Route path='' element={<PrivateRoute />} >
        <Route path="/crime/search" element={<CrimeSearchPage />} />
        <Route path="/criminal/search" element={<CriminalSearchPage />} />
        <Route path="/officer/search" element={<OfficerSearchPage />} />
        <Route path="/probation-officer/search" element={<ProbationOfficerSearchPage />} />
        <Route path="/appeal/search" element={<AppealSearchPage />} />
        <Route path="/crime-charge/search" element={<CrimeChargeSearchPage />} />
        <Route path="/sentence/search" element={<SentenceSearchPage />} />
      </Route>

      <Route path='' element={<AdminRoute />} >
        <Route path="/crime" element={<CrimePage />} />
        <Route path="/crime/:id" element={<CrimePage />} />

        <Route path="/criminal" element={<CriminalPage />} />
        <Route path="/criminal/:id" element={<CriminalPage />} />

        <Route path="/officer" element={<OfficerPage />} />
        <Route path="/officer/:id" element={<OfficerPage />} />

        <Route path="/probation-officer" element={<ProbationOfficerPage />} />
        <Route path="/probation-officer/:id" element={<ProbationOfficerPage />} />

        <Route path="/appeal" element={<AppealPage />} />
        <Route path="/appeal/:id" element={<AppealPage />} />

        <Route path="/crime-charge" element={<CrimeChargePage />} />
        <Route path="/crime-charge/:id" element={<CrimeChargePage />} />

        <Route path="/sentence" element={<SentencePage />} />
        <Route path="/sentence/:id" element={<SentencePage />} />

      </Route>
    </Route >
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
