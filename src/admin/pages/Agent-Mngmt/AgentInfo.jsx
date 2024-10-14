import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getFullUrl } from "../../utils"; 
import RedButton from "../../../user/DesignSystem/RedButton";
import OutlinedButton from "../../components/OutlinedButton";
import axiosInstance from "../../../../axios.utils";

const AgentInfo = ({
  className='',
  phoneno,
  fullname,
  address,
  profilePicture,
  key1,
  accountno,
  Role
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-[20.25rem] rounded-lg bg-white box-border flex flex-col items-start justify-start px-[0rem] py-[0.75rem] relative gap-[5rem] max-w-full text-left text-[0.875rem] text-black1 font-roboto border-[1px] border-solid border-foundation-white-normal-hover mq450:gap-[2.5rem] ${className}`}
    >
      {/* <div className="self-stretch h-[5rem] relative rounded-t-lg rounded-b-none bg-off-white" />
      <img
        className="w-[7.5rem] h-[7.5rem] absolute !m-[0] top-[1.5rem] left-[6.331rem] rounded-[50%] object-cover z-[1]"
        alt=""
        src={profilePicture ? getFullUrl(profilePicture) : ""}
      /> */}
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.812rem] pl-[0.687rem]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[1rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
          <div className="relative text-gray-100">
              <span className="font-medium">
                <span className="text-black1">Agent id :</span>
                <span>{` `}</span>
              </span>
              <span>
                <span>{key1}</span>
              </span>
            </div>
            <div className="relative">
              <span className="font-medium">{`Name : `}</span>
              <span className="text-gray-100">{fullname}</span>
            </div>
            {/* <div className="relative text-gray-100">
              <span className="font-medium">
                <span className="text-black1">Account no :</span>
                <span>{` `}</span>
              </span>
              <span>
                <span>{accountno}</span>
              </span>
            </div> */}
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
                <span className="font-medium">Address :</span>
              </span>
              <span className="text-gray-100">
                <span>{` `}</span>
                <span>{address}</span>
              </span>
            </div>
          </div>
          <OutlinedButton label={"View Full Details"} className="w-full" onClick={() => navigate(`/admin/agmgmt/${key1}`)} />
        </div>
      </div>
    </div>
  );
};

AgentInfo.propTypes = {
  className: PropTypes.string,
  ellipse245: PropTypes.string,
};

export default AgentInfo;
