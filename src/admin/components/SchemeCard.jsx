import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../utils";
import axiosInstance from "../../../axios.utils";
import RedButton from "../../user/DesignSystem/RedButton";
import OutlinedButton from "./OutlinedButton";

const SchemeCard = ({
  className = "",
  propLeft,
  propRight,
  profilePicture,
  phoneno,
  fullname,
  address,
  amount,
  plan,
  key1,
  id,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const profilePictureIconStyle = useMemo(() => {
    return {
      left: propLeft,
      right: propRight,
    };
  }, [propLeft, propRight]);

  const viewDetails = (key1, id) => {
    const userId = key1;
    const schemeId = id;
    navigate(`/admin/scheme/${userId}/${schemeId}`);
  };

  async function approve(status) {
    try {
      setLoading(true)
      const res = await axiosInstance.put("admin/classic/Scheme", {
        data: {
          Status: status,
          Scheme: id,
        },
      });
      setLoading(false)
      console.log(res);
    } catch (error) {
      setLoading(false)
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
                <span>{plan}</span>
              </span>
            </div>
            <div className="relative">
              <span>
                <span className="font-medium">Deposit Amount :</span>
              </span>
              <span className="text-gray-100">
                <span>{` `}</span>
                <span>{amount}</span>
              </span>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[0.75rem] mq450:flex-wrap">
            <RedButton
            label={"Approve"}
            padding="py-[0.5rem] px-[2.562rem]"
            className="w-full"
            onClick={()=>approve("Active")}
            loading={loading}/>
            <OutlinedButton
            label={"Deny"}
            padding="py-[0.5rem] px-[2.562rem]"
            className={"w-full h-[35.2px]"}
            onClick={()=>approve("Rejected")}/>
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

SchemeCard.propTypes = {
  className: PropTypes.string,
  profilePicture: PropTypes.string,
  propLeft: PropTypes.any,
  propRight: PropTypes.any,
  phoneno: PropTypes.string,
  fullname: PropTypes.string,
  address: PropTypes.string,
  // key: PropTypes.string.isRequired,
};

export default SchemeCard;
