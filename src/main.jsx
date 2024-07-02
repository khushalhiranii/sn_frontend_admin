import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import LoanRequest from './pages/Loan-Request/LoanRequest.jsx'
import SchemeRequest from './pages/Scheme-Request/SchemeRequest.jsx'
import SavingAccount from './pages/Saving-Account/SavingAccount.jsx'
import Kycprocess from './components/kyc-process.jsx'
import PendingKYC from './components/PendingKYC.jsx'
import CompletedKyc from './components/CompletedKyc.jsx'
import ClientDetails from './pages/Saving-Account/ClientDetails.jsx'
import LoanInfo from './pages/Loan-Info/LoanInfo.jsx'
import SchemeInfo from './pages/Scheme-Info/SchemeInfo.jsx'
import CustomerMngmt from './pages/Customer-mngmt/CustomerMngmt.jsx'
import AgentMngmt from './pages/Agent-Mngmt/AgentMngmt.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='loanRequest' element={<LoanRequest/>}/>
      <Route path='scheme' element={<SchemeRequest/>}/>
      <Route path='loanInfo' element={<LoanInfo/>}/>
      <Route path='schemeInfo' element={<SchemeInfo/>}/>
      <Route path='cusmgmt' element={<CustomerMngmt/>} />
      <Route path='agmgmt' element={<AgentMngmt/>} />
      <Route path='savingAccount' element={<Kycprocess/>}>
        {/* <Route index element={<CompletedKyc/>}/> */}
        <Route path='completed' element={<CompletedKyc/>}/>
        <Route path='pending' element={<PendingKYC/>}/>
        
      </Route>
      <Route path='client/:userId' element={<ClientDetails/>} />
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
