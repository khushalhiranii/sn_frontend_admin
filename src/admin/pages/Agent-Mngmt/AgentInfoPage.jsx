import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdminSocket } from '../../context/AdminSocketContext';
import { calculateAge } from '../../calculateAge';
import Loader from '../../../LoadingIndicator/Loader';
import OutlinedButton from '../../components/OutlinedButton';
const Agent = ({ label, count=0, path}) =>{
  const navigate = useNavigate();
  const {agentId} = useParams();
  return(
    <div className='flex flex-col rounded-xl gap-4 border-solid border-[1px] border-[#E3E3E3] w-[45%] p-[16px] text-[#000000]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='text-[20px] font-medium'>
            {label}
          </div>
          <div className='text-[28px] font-medium'>
            {count}
          </div>
        </div>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6481_17147)">
        <path d="M25.3332 32C25.3335 30.6938 25.7199 29.4167 26.4439 28.3294L19.7932 21.6787C17.3445 24.5602 16 28.2186 16 32C16 35.7815 17.3445 39.4398 19.7932 42.3214L26.4439 35.6707C25.7199 34.5834 25.3335 33.3063 25.3332 32Z" fill="#3C3A36"/>
        <path d="M44.2054 21.6787L37.5547 28.3294C38.2789 29.4166 38.6653 30.6937 38.6653 32C38.6653 33.3064 38.2789 34.5835 37.5547 35.6707L44.2054 42.3214C46.6541 39.4398 47.9986 35.7815 47.9986 32C47.9986 28.2186 46.6541 24.5602 44.2054 21.6787Z" fill="#3C3A36"/>
        <path d="M32.001 38.6663C30.6947 38.6661 29.4177 38.2797 28.3304 37.5557L21.6797 44.2063C24.5612 46.6551 28.2195 47.9996 32.001 47.9996C35.7825 47.9996 39.4408 46.6551 42.3224 44.2063L35.6717 37.5557C34.5844 38.2797 33.3073 38.6661 32.001 38.6663Z" fill="#3C3A36"/>
        <path d="M32.001 25.3332C33.3073 25.3335 34.5844 25.7199 35.6717 26.4439L42.3224 19.7932C39.4408 17.3445 35.7825 16 32.001 16C28.2195 16 24.5612 17.3445 21.6797 19.7932L28.3304 26.4439C29.4177 25.7199 30.6947 25.3335 32.001 25.3332Z" fill="#3C3A36"/>
        </g>
        <defs>
        <clipPath id="clip0_6481_17147">
        <rect width="32" height="32" fill="white" transform="translate(16 16)"/>
        </clipPath>
        </defs>
        </svg>

      </div>
      
      <OutlinedButton label={"View Full Details"} onClick={()=> navigate(`/admin/agmgmt/${agentId}/${path}`)}/>
    </div>
  )
}

function AgentInfoPage() {
  const {agentId} = useParams();
  const { users, agents } = useAdminSocket();
  const usersArray = Object.values(users)
  const agentsArray = Object.values(agents)
  const data = usersArray.find((user)=> user.Identifier === agentId )
  const agent = agentsArray.find((user)=> user.Identifier === agentId )
  console.log(agent)
  if(!data || !agent){
    return(<Loader/>)
  }
  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start px-4 py-8 w-[calc(100%_-_344px)] text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <div className="flex flex-row flex-wrap items-center justify-start py-4 pl-4 w-full gap-4 bg-[#F5F5F5] rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            {/* <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Photo)} // Provide a fallback image
            /> */}
            <div className="h-[5rem] w-[5rem] rounded-lg bg-[#D9D9D9]" />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                {data?.Name} | {calculateAge(data.Birth)}
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
              {data?.Number} | {data?.Mail}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap w-full gap-6 justify-between'>
            <Agent label={"In Field Verification"} count={agent.Meta?.Verified?.length} path={"Verified"}/>
            <Agent label={"Pending Field Verification"} count={agent.Meta?.Unverified?.length} path={"Unverified"}/>
            <Agent label={"Recovered Loans"} count={agent.Meta?.Active?.List.length + agent.Meta?.Closed?.List.length} path={"Recovered"} />
            <Agent label={"Unrecovered Loans"} count={agent.Meta?.Overdue?.List.length + agent.Meta?.Buffer?.List.length} path={"Unrecovered"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentInfoPage