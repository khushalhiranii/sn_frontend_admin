import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAxios from "../axiosSetup";

const LoanCard = ({
  className = "",
  propLeft,
  propRight,
  profilePicture,
  phoneno,
  fullname,
  address,
  amount,
  key1,
  id
}) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const profilePictureIconStyle = useMemo(() => {
    return {
      left: propLeft,
      right: propRight,
    };
  }, [propLeft, propRight]);

  
  const viewDetails = (key1, id) => {
    const userId = key1;
    const loanId = id
    navigate(`/admin/loanRequest/${userId}/${loanId}`);
  };

  async function approve(){
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/user/account/requests/${key1}`);
      const user = res.data.data;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div
      className={`w-[20.25rem] rounded-lg bg-white box-border flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1rem] relative gap-[5rem] max-w-full text-left text-[0.875rem] text-black1 font-roboto border-[1px] border-solid border-foundation-white-normal-hover mq450:gap-[2.5rem] ${className}`}
    >
      <div className="self-stretch h-[5rem] relative rounded-t-lg rounded-b-none bg-off-white" />
      <img
        className="w-[7.5rem] h-[7.5rem] absolute !m-[0] top-[1.5rem] left-[6.331rem] rounded-[50%] object-cover z-[1]"
        loading="lazy"
        alt=""
        src={profilePicture}
        style={profilePictureIconStyle}
      />
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.812rem] pl-[0.687rem]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[1rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="relative">
              <span className="font-medium">{`Name : `}</span>
              <span className="text-gray-100">{fullname}</span>
            </div>
            <div className="relative text-gray-100">
              <span className="font-medium">
                <span className="text-black1">Phone NO :</span>
                <span>{` `}</span>
              </span>
              <span>
                <span>{phoneno}</span>
              </span>
            </div>
            <div className="relative">
              <span>
                <span className="font-medium">Client Address :</span>
              </span>
              <span className="text-gray-100">
                <span>{` `}</span>
                <span>{address}</span>
              </span>
            </div>
            <div className="relative">
              <span>
                <span className="font-medium">Applied Plan :</span>
              </span>
              <span className="text-gray-100">
                <span>{` `}</span>
                <span>{amount}</span>
              </span>
            </div>
            <div className="w-[9.375rem] relative hidden">
              <span className="font-medium">{`Property Address : `}</span>
              <span>*****</span>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[0.75rem] mq450:flex-wrap">
            <button onClick={approve} className="cursor-pointer [border:none] py-[0.5rem] px-[2.562rem] bg-foundation-red-normal rounded flex flex-row items-start justify-start hover:bg-mediumvioletred-100">
              <div className="relative text-[1rem] capitalize font-medium font-roboto text-white text-left inline-block min-w-[3.75rem]">
                Approve
              </div>
            </button>
            <button className="cursor-pointer py-[0.375rem] pr-[3.25rem] pl-[3.312rem] bg-[transparent] rounded flex flex-row items-start justify-start border-[1px] border-solid border-foundation-red-normal hover:bg-mediumvioletred-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-mediumvioletred-100">
              <div className="relative text-[1rem] capitalize font-medium font-roboto text-foundation-red-normal text-left inline-block min-w-[2.25rem]">
                Deny
              </div>
            </button>
          </div>
          <button 
            className="cursor-pointer py-[0.375rem] px-[1.25rem] bg-[transparent] self-stretch rounded flex flex-row items-start justify-center whitespace-nowrap border-[1px] border-solid border-foundation-red-normal hover:bg-mediumvioletred-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-mediumvioletred-100"
            onClick={() => viewDetails(key1, id)}
          >
            <div className="relative text-[1rem] capitalize font-medium font-roboto text-foundation-red-normal text-left inline-block min-w-[7.438rem]">
              View Full Details
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

LoanCard.propTypes = {
  className: PropTypes.string,
  profilePicture: PropTypes.string,
  propLeft: PropTypes.any,
  propRight: PropTypes.any,
  phoneno: PropTypes.string,
  fullname: PropTypes.string,
  address: PropTypes.string,
  // key: PropTypes.string.isRequired,
};

export default LoanCard;
