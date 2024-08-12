import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Layout from './admin/Layout.jsx';
import Dashboard from './admin/pages/Dashboard/Dashboard.jsx';
import LoanRequest from './admin/pages/Loan-Request/LoanRequest.jsx';
import SchemeRequest from './admin/pages/Scheme-Request/SchemeRequest.jsx';
import Kycprocess from './admin/components/kyc-process.jsx';
import PendingKYC from './admin/components/PendingKYC.jsx';
import CompletedKyc from './admin/components/CompletedKyc.jsx';
import ClientDetails from './admin/pages/Saving-Account/ClientDetails.jsx';
import LoanInfo from './admin/pages/Loan-Info/LoanInfo.jsx';
import SchemeInfo from './admin/pages/Scheme-Info/SchemeInfo.jsx';
import CustomerMngmt from './admin/pages/Customer-mngmt/CustomerMngmt.jsx';
import AgentMngmt from './admin/pages/Agent-Mngmt/AgentMngmt.jsx';
import { AuthProvider } from './admin/context/AuthContext.jsx';
import PrivateRoute from './admin/Routes/PrivateRoute.jsx';
import LoanDetails from './admin/pages/Loan-Request/LoanDetails.jsx';
import Landing from './user/Landing.jsx';
import Home from './user/Home/Home.jsx';
import Schemes from './user/Schemes/Schemes.jsx';
import { UserDataProvider } from './user/SavingAccount/Registration/context/UserDataContext.jsx';
import StepContext from './user/SavingAccount/Registration/context/StepContext.jsx';
import Registration from './user/SavingAccount/Registration/pages/Registration.jsx';
import { Inputbar } from './user/SavingAccount/Registration/components/Inputbar.jsx';
import { Otp } from './user/SavingAccount/Registration/components/otp.jsx';
import { OtpVerified } from './user/SavingAccount/Registration/components/OtpVerfied.jsx';
import PrivateRoutes from './user/SavingAccount/Registration/routes/PrivateRoutes.jsx';
import PrivateRoute2 from './user/SavingAccount/Registration/routes/PrivateRoute2.jsx';
import OpenAcc from './user/SavingAccount/Registration/components/OpenAcc.jsx';
import SchemePage from './user/Schemes/SchemePage.jsx';
import DepositProvider from './user/context/SchemeContext.jsx';
import { Login } from './user/Login/Login.jsx';
import LoadingIndicator from './admin/components/LoadingIndicator.jsx';
import PvtRtUserLogin from './user/SavingAccount/Registration/routes/PvtRtUserLogin.jsx';

const AppRouter = () => (
  <Router>
    <LoadingIndicator/>
    <Routes>
    <Route path="/" element={<Landing/>}>
      <Route index element={<Home/>}/>
      {/* <Route path="schemes" element={<PvtRtUserLogin component={Schemes}/>}/> */}
      <Route path="schemes" element={<Schemes/>}/>
      {/* <Route path="schemeApplication" element={<PvtRtUserLogin component={SchemePage}/>}/> */}
      <Route path="schemeApplication" element={<SchemePage/>}/>      
    </Route>
    <Route path='/register' element={<Registration/>}>
      <Route index element={<Inputbar/>}/>
      {/* <Route path='otp' element={<PrivateRoute component={Otp} />}/> */}
      <Route path='otp' element={<Otp/>}/>
      {/* <Route path='otpverified' element={<PrivateRoutes component={OtpVerified}/>}/> */}
      <Route path='otpverified' element={<OtpVerified/>}/>
      {/* <Route path='openAcc' element={<PrivateRoute2 component={OpenAcc}/>}/> */}
      <Route path='openAcc' element={<OpenAcc/>}/>
    </Route>
    <Route path='/login' element={<Registration/>}>
    <Route index element={<Login/>}/>
    <Route path='otp' element={<Otp/>}/>
    <Route path='otpverified' element={<OtpVerified/>}/>
    </Route>
    <Route path="/admin" element={<App />} />
    <Route
      path="/admin/*"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="loanRequest" element={<LoanRequest />} />
      <Route path="scheme" element={<SchemeRequest />} />
      <Route path="loanInfo" element={<LoanInfo />} />
      <Route path="schemeInfo" element={<SchemeInfo />} />
      <Route path="cusmgmt" element={<CustomerMngmt />} />
      <Route path="agmgmt" element={<AgentMngmt />} />
      <Route path="savingAccount" element={<Kycprocess />}>
        <Route path="completed" element={<CompletedKyc />} />
        <Route path="pending" element={<PendingKYC />} />
      </Route>
      <Route path="client/:userId" element={<ClientDetails />} />
      <Route path="loanDetail" element={<LoanDetails />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <StepContext>
          <DepositProvider>
          <AppRouter />
          </DepositProvider>
        </StepContext>
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
