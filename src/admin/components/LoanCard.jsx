import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../utils";
import axiosInstance from "../../../axios.utils";
import RedButton from "../../user/DesignSystem/RedButton";
import OutlinedButton from "./OutlinedButton";

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
  id,
  ...props
}) => {
  const navigate = useNavigate();
  const profilePictureIconStyle = useMemo(() => {
    return {
      left: propLeft,
      right: propRight,
    };
  }, [propLeft, propRight]);
  const [loading, setLoading] = useState(false)

  const deny = async () => {
    try {
      const response = await axiosInstance.put('admin/classic/Reject', {
        "data" : {
            "Request":id
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const approve = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.post('admin/classic/Create-Loan', {
        "data" : {
            "Request":id
        }
      })
      setLoading(false)
      console.log(response)
    } catch (error) {
      console.error(error)
      setLoading(false)
      alert("Customer didn't accept the offer")
    }
  }

  
  const viewDetails = (key1, id) => {
    const userId = key1;
    const loanId = id
    navigate(`/admin/loanRequest/${userId}/${loanId}`);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Simulate loading effect after a brief delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div
      className={`w-[20.25rem] rounded-lg bg-white box-border flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1rem] relative gap-[5rem] max-w-full text-left text-[0.875rem] text-black1 font-roboto border-[1px] border-solid border-foundation-white-normal-hover mq450:gap-[2.5rem] ${className}`}
    >
      <div className="self-stretch h-[5rem] relative rounded-t-lg rounded-b-none bg-off-white">
        <div className={`relative text-white px-4 py-1 my-2 transition-all duration-500 ease-out transform overflow-hidden ${
          isLoaded ? 'translate-x-0 w-[35%]' : '-translate-x-full w-0'
        } ${props.Status === "Pending" ? "bg-red-600" : props.Status === "Accepted" ? "bg-green-400" : "bg-blue-500"}`}>
          <span className="absolute inset-y-0 left-0 w-2 h-full bg-current"></span> {/* Tail effect */}
          {props.Status}
        </div>
      </div>
      <img
        className="w-[7.5rem] h-[7.5rem] absolute !m-[0] top-[1.5rem] left-[6.331rem] rounded-[50%] object-cover z-[1]"
        loading="lazy"
        alt=""
        src={getFullUrl(profilePicture)}
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
            <RedButton
            label={"Approve"}
            padding="py-[0.5rem] px-[2.562rem]"
            className="w-full"
            onClick={()=>approve()}
            loading={loading}/>
            <OutlinedButton
            label={"Deny"}
            padding="py-[0.5rem] px-[2.562rem]"
            className={"w-full h-[35.2px]"}
            onClick={()=>deny()}/>
          </div>
          <OutlinedButton
            label={"View Full Details"}
            padding="py-[0.5rem] px-[2.562rem]"
            className={"w-full h-[35.2px]"}
            onClick={() => viewDetails(key1, id) }/>
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
