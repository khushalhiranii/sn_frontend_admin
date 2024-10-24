import React from 'react';
import LoanInfoPage from '../Loan-Info/LoanInfoPage';
import LoanDetails from '../Loan-Request/LoanDetails';
import { useParams } from 'react-router-dom';

function AgentUserInfo() {
    const { loanId } = useParams(); // Get loanId from the route parameters

    // Conditional rendering based on loanId prefix
    const isLoanInfoPage = loanId?.startsWith('LN');

    
    if(isLoanInfoPage){
        return <LoanInfoPage />;
    }
    else{
        return <LoanDetails />
    }
        
}

export default AgentUserInfo;
