import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Layout from './admin/Layout.jsx';
import Dashboard from './admin/pages/Dashboard/Dashboard.jsx';
import LoanRequest from './admin/pages/Loan-Request/LoanRequest.jsx';
import SchemeRequest from './admin/pages/Scheme-Request/SchemeRequest.jsx';
import Kycprocess from './admin/components/kyc-process.jsx';
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
import Loans from './user/Loans/Loans.jsx';
import LoanPage from './user/Loans/LoanPage.jsx';
import LoanProvider from './user/context/LoanContext.jsx';
import AccountAction from './user/SavingAccount/Registration/pages/AccountAction.jsx';
import AccountDetails from './user/SavingAccount/Registration/pages/AccountDetails.jsx';
import AccountStatement from './user/SavingAccount/Registration/pages/AccountStatement.jsx';
import AccountUpdate from './user/SavingAccount/Registration/pages/AccountUpdate.jsx';
import PhoneUpdate from './user/SavingAccount/Registration/pages/PhoneUpdate.jsx';
import Notifications from './admin/pages/Notifications.jsx';
import AgentLogin from './agent/pages/AgentLogin.jsx';
import LayoutAgent from './agent/components/LayoutAgent.jsx';;
import HomeAgent from './agent/pages/HomeAgent.jsx';
import Due from './agent/pages/Due.jsx';
import PendingAgent from './agent/pages/PendingAgent.jsx';
import HistoryAgent from './agent/pages/HistoryAgent.jsx';
import ProfileAgent from './agent/pages/ProfileAgent.jsx';
import { SocketProvider, useAdminSocket } from './admin/context/AdminSocketContext.jsx';
import SchemeDetails from './admin/pages/Scheme-Request/SchemeDetails.jsx';
import SchemeDetails1 from './admin/pages/Scheme-Info/SchemeDetails1.jsx';
import { LoadingProvider } from './LoadingIndicator/LoadingContext.jsx'
import LoanInfoProvider from './admin/pages/Loan-Info/LoanInfoContext.jsx';
import ScrollToTop from './user/ScrollToTop.jsx';
import Repogen from './admin/assets/repo-gen.jsx';
import RepoGen from './admin/pages/Repo-Gen/RepoGen.jsx';
import { SchemeProvider } from './admin/pages/Scheme-Request/SchemeContext.jsx';
import ApprovedLoans from './admin/pages/Loan-Info/ApprovedLoans.jsx';
import { UserSocketProvider } from './user/context/UserSocketContext.jsx';
import CustomerInfoPage from './admin/pages/Customer-mngmt/CustomerInfoPage.jsx';
import AdminInfo from './admin/pages/Admin-Info/AdminInfo.jsx';
import MpinUpdate from './user/SavingAccount/Registration/pages/MpinUpdate.jsx';
import DetailsUpdate from './user/SavingAccount/Registration/pages/DetailsUpdate.jsx';
import UserNotifications from './user/SavingAccount/Registration/pages/UserNotification.jsx';
import UserInfoPage from './user/SavingAccount/Registration/pages/UserInfoPage.jsx';
import { AccountApplied } from './user/SavingAccount/Registration/components/AccountApplied.jsx';
import LoanInfoPage from './admin/pages/Loan-Info/LoanInfoPage.jsx';
import AgentInfoPage from './admin/pages/Agent-Mngmt/AgentInfoPage.jsx';


const RenderSocketProvider = ({ children }) => {
  const location = useLocation();
  
  const role = sessionStorage.getItem('role')
  
  const provider = useMemo(() => {
    switch (role) {
      case 'admin':
        return (
          <SocketProvider>
            <LoanInfoProvider>
              <SchemeProvider>
              {children}
              </SchemeProvider>
            </LoanInfoProvider>
          </SocketProvider>
        );
        // case 'user':
        //   return(
        //     <UserSocketProvider>
        //       {children}
        //     </UserSocketProvider>
        //   )
      default:
        return(
          <UserSocketProvider>
            {children}
          </UserSocketProvider>
        )
    }
  }, [role, location.pathname]); // Recompute whenever role or path changes

  return provider;
};

const AppRouter = () => {
  return(
  <Router>
    <ScrollToTop/>
    <LoadingIndicator/>
    <RenderSocketProvider>
      
    <Routes>
    <Route path="/" element={<Landing/>}>
      <Route index element={<Home/>}/>
      <Route path='user' element={<UserInfoPage/>} />
      <Route path="schemes" element={<Schemes/>}/>
      {/* <Route path="schemes" element={<Schemes/>}/> */}
      <Route path="loans" element={<Loans/>}/>
      {/* <Route path="schemeApplication" element={<PvtRtUserLogin component={SchemePage}/>}/> */}
      <Route path="schemeApplication" element={<SchemePage/>}/>
      <Route path="loanApplication" element={<LoanPage/>}/>
      <Route path='saving-account' element={<AccountAction/>}/>
      <Route path='saving-account/info' element={<AccountDetails/>}/>
      <Route path='saving-account/statement' element={<AccountStatement/>}/>
      <Route path='/notifications' element={<UserNotifications/>} />
      <Route path='saving-account/update/' element={<AccountUpdate/>}>
      <Route path='phone' element={<PhoneUpdate/>}/>
      <Route path='mpin' element={<MpinUpdate/>}/>
      <Route path='details' element={<DetailsUpdate/>}/>
      </Route>
      
      
    </Route>
    <Route path='/register' element={<Inputbar/>}/>
    <Route path='/register/otp' element={<Otp/>}/>
    <Route path='/register/otpverified' element={<OtpVerified/>}/>
    <Route path='/register/openAcc' element={<OpenAcc/>}/>
    <Route path='/register/verified' element={<AccountApplied/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/login/otp' element={<Otp/>}/>
    <Route path='/login/otpverified' element={<OtpVerified/>}/>
    <Route path="/agent" element={<AgentLogin />} />
    {/* <Route
      path="/admin/*"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    > */}
    <Route
      path="/agent/*"
      element={
        // <PrivateRoute>
          <LayoutAgent />
        // </PrivateRoute>
      }
    >
      <Route path="home" element={<HomeAgent />} />
      <Route path="due" element={<Due />} />
      <Route path="pending" element={<PendingAgent/>} />
      <Route path="history" element={<HistoryAgent/>} />
      <Route path="profile" element={<ProfileAgent/>} />
    </Route>
    <Route path="/admin" element={<App />} />
    {/* <Route
      path="/admin/*"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    > */}
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
      <Route path="savingAccount" element={<Kycprocess />}/>
      <Route path="repogen" element={<RepoGen />}/>
      <Route path="notifications" element={<Notifications />} />
      <Route path="savingAccount/:userId" element={<ClientDetails />} />
      <Route path="cusmgmt/:userId" element={<CustomerInfoPage />} />
      <Route path="loanRequest/:userId/:loanId" element={<LoanDetails />} />
      <Route path="scheme/:userId/:schemeId" element={<SchemeDetails />} />
      <Route path="schemeInfo/:userId/:schemeId" element={<SchemeDetails1 />} />
      <Route path='loanInfo/ApprovedLoans' element={<ApprovedLoans/>} />
      <Route path='loanInfo/ApprovedLoans/:userId/:loanId' element={<LoanInfoPage/>} />
      <Route path="agmgmt/:userId" element={<AgentInfoPage />} />
      <Route path='AdminInfo' element={<AdminInfo/>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Route>
    </Routes>
    
    </RenderSocketProvider>
  </Router>)
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <StepContext>
          <DepositProvider>
            <LoanProvider>
              <LoadingProvider>
                
              {/* <SocketProvider> */}
                <AppRouter />
                {/* </SocketProvider> */}
                
              </LoadingProvider>
            </LoanProvider>
          </DepositProvider>
        </StepContext>
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
