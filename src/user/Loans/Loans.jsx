import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLoanContext } from '../context/LoanContext';
import RedButton from '../DesignSystem/RedButton';
import { useUserSocket } from '../context/UserSocketContext';
import axiosInstance from '../../../axios.utils';
import Loader from '../../LoadingIndicator/Loader';

function Loans() {
  const { setSelectedLoan } = useLoanContext();
  const [loading, setLoading] = useState();
  const { requests = [], products = [] } = useUserSocket(); // Ensure requests and products default to empty arrays if undefined

  const [spinLoading, setSpinLoading] = useState(true); // Loading state

  // Simulate 1-second loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinLoading(false); // Stop loading after 1 second
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  if (spinLoading) {
    return (
      <Loader/>
    );
  }

  // 1. Check if requests is an array before filtering for 'Offered' status loans
  const offeredArray = Array.isArray(requests) ? requests.filter(request => request.Status === 'Offered') : [];
  console.log(offeredArray);

  // 2. Create a unique combination of product ID and request ID
  const uniqueProductRequestCombinations = [];

  // 3. Iterate through the offeredArray to gather product and request ID combinations
  offeredArray.forEach(request => {
    const { Request, Products = [] } = request;
    Products.forEach(productId => {
      // Ensure that the combination of productId and requestID is unique
      const combination = `${productId}-${Request}`;
      if (!uniqueProductRequestCombinations.some(item => item.combination === combination)) {
        uniqueProductRequestCombinations.push({
          productId,
          requestId: Request,
          combination,
        });
      }
    });
  });

  const AvailNow = ( requestId, productId ) => {
    setLoading(true)
    try {
      const res  = axiosInstance.post('/client/classic/Offer', {
        "data" : {
            "Request" : requestId,
            "Product" : productId
        }
    })
    console.log(res);
    alert('Loan Accepted Successfully')
  
    } catch (error) {
      console.error("Error occurred while requesting", error)
    }finally{
      setLoading(false)
    }
  }

  // 4. For each unique combination, get the product data from the products array
  const uniqueProductData = uniqueProductRequestCombinations.map(({ productId, requestId }) => {
    const productData = Array.isArray(products) ? products.find(product => product.Product === productId) : [];
    return productData ? { ...productData, requestId } : null; // Add requestId to the product data
  }).filter(Boolean); // Remove any null values if no product data is found

  console.log("Unique Product Data with Request IDs:", uniqueProductData);

  const imgWithLabel = (src, label) => {
    return (
      <div className='w-full flex flex-col gap-[32px]'>
        <img src={src} className='h-[240px] w-[405.5px] rounded-2xl' alt={label} />
        <div className='flex justify-center w-[405.5px] text-[20px] font-semibold'>
          {label}
        </div>
      </div>
    );
  };

  // Corrected ApprovedCard function with proper argument parentheses
  const ApprovedCard = ({ type, tenure, amount, emi, requestId, productId }) => {
    return (
      <div className='w-full flex flex-row items-center justify-between bg-[#F5F5F5] px-[32px] py-[16px] box-border rounded-[12px]'>
        <div className='flex flex-row bg-[#F2DAE3] px-[40px] py-[18px] gap-[36px] items-center box-border rounded-[5px]'>
          <div className='text-[24px] font-semibold'>Pre Approved {type} Loan</div>
          <div className='flex flex-col text-[16px] gap-[16px] font-normal'>
            <div>Amount: ₹ {amount}</div>
            <div>Tenure: {tenure} weeks</div>
            {/* <div>Request ID: {requestId}</div> {/* Display Request ID */}
            {/* <div>Product ID: {productId}</div> */}
          </div>
        </div>
        <div className='text-[20px] font-semibold flex flex-col items-center justify-center'>
          <div>₹ {emi}</div>
          <div>Weekly</div>
        </div>
        <RedButton label={"Avail Now"} className='w-[20%] h-[46px]' onClick={()=>AvailNow(requestId, productId)} />
      </div>
    );
  };

  return (
    <div className='flex flex-col p-[64px] gap-[64px]'>
      <div className='flex'>
        <img className='w-full' src='/loans.png' alt="Schemes" />
      </div>

      {offeredArray.length != 0 && uniqueProductData.length !== 0 &&
        uniqueProductData.map((product, index) => (
          <ApprovedCard
            key={index}
            amount={product.Amount}
            emi={product.Emi}
            type={product.Type}
            tenure={product.Tenure}
            requestId={product.requestId} // Pass requestId to the ApprovedCard
            productId={product.Product}
          />
        ))}

      <div className='flex flex-col'>
        <div className='flex flex-row justify-between mq1275:flex-col mq1275:gap-[16px]'>
          <NavLink 
            to="/loanApplication" 
            className="no-underline text-black" 
            onClick={() => setSelectedLoan('Personal Loan')}
          >
            {imgWithLabel("/PL.png", "Personal Loan")}
          </NavLink>
          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Instant')}>
            {imgWithLabel("/IL.png", "Instant Loan")}
          </NavLink>
          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Property')}>
            {imgWithLabel("/PrL.png", "Property Loan")}
          </NavLink>
        </div>
        <div className='flex flex-row p-[64px] justify-evenly mq1275:flex-col mq1275:gap-[16px]'>
          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Business')}>
            {imgWithLabel("/BL.png", "Business Loan")}
          </NavLink>
          <NavLink to="/loanApplication" className="no-underline text-black" onClick={() => setSelectedLoan('Micro Finance')}>
            {imgWithLabel("/MFL.png", "Micro Finance Loan")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Loans;
