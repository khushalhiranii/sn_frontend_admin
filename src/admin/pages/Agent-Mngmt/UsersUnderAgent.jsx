import React, { useState, useEffect, useMemo } from 'react';
import Briefcase from '../../assets/briefcase';
import Hr from '../../assets/hr-person';
import Time from '../../assets/time';
import Apartment from '../../assets/apartment';
import LoanInfoCard from '../Loan-Info/LoanInfoCard';
import { useAdminSocket } from '../../context/AdminSocketContext';
import { useParams } from 'react-router-dom';
import AgentUsers from './AgentUsers';
import { extractDateTime } from '../../extractDateTime';
import Loader from '../../../LoadingIndicator/Loader';

function UsersUnderAgent() {
    const { agentId, filter } = useParams(); // Get agent identifier and filter from route
    const { agents } = useAdminSocket(); // Get agents data from socket context
    const [loanType, setLoanType] = useState(filter); // Selected loan type state
    const [filteredLoans, setFilteredLoans] = useState([]); // Filtered loans state

    // Ensure agents is an array (or use an empty array as fallback)
    const validAgents = useMemo(() => Object.values(agents) || [], [agents]);

    // Find the agent based on the agentId parameter (guard against empty agent list)
    const agent = useMemo(() => {
        if (validAgents.length === 0) return null;
        return validAgents.find(agent => agent.Identifier === agentId) || null;
    }, [validAgents, agentId]);

    // Calculate loan counts for display
    const loanCounts = useMemo(() => ({
        Verified: agent?.Meta?.Verified?.length || 0,
        Unverified: agent?.Meta?.Unverified?.length || 0,
        Recovered: agent?.Meta?.Closed?.List?.length || 0,
        Unrecovered:
            (agent?.Meta?.Active?.List?.length || 0) +
            (agent?.Meta?.Buffer?.List?.length || 0) +
            (agent?.Meta?.Overdue?.List?.length || 0),
    }), [agent]);

    // Update the displayed loans when loan type or agent changes
    useEffect(() => {
        if (!agent) return; // If agent is undefined, do nothing

        let loans = [];
        switch (loanType) {
            case 'Verified':
                loans = agent.Meta.Verified || [];
                break;
            case 'Unverified':
                loans = agent.Meta.Unverified || [];
                break;
            case 'Recovered':
                loans = agent.Meta.Closed.List || [];
                break;
            case 'Unrecovered':
                loans = [
                    ...(agent.Meta.Active.List || []),
                    ...(agent.Meta.Buffer.List || []),
                    ...(agent.Meta.Overdue.List || []),
                ];
                break;
            default:
                loans = [];
        }

        // Map each loan to its corresponding user details
        const mappedLoans = loans.map(loan => ({
            ...loan,
            User: agent.Users.find(user => user.Identifier === loan.Identifier),
        }));

        setFilteredLoans(mappedLoans); // Update state with the filtered loans
    }, [loanType, agent]);
    console.log(filteredLoans)

    if (!agent) return <Loader/>; // Display message if agent isn't available

    return (
        <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border w-full text-[1rem] text-white mq850:h-auto mq850:max-w-full">
            <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
                <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
                    <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
                        <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
                            {['Verified', 'Unverified', 'Recovered', 'Unrecovered'].map((type, idx) => (
                                <div key={idx} className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                                    <button
                                        onClick={() => setLoanType(type)}
                                        className={`navlink2 ${loanType === type ? 'active' : ''}`}
                                    >
                                        {getIcon(type)} {getLoanTypeLabel(type)} ({loanCounts[type]})
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3 items-center justify-between px-[16px] box-border gap-4">
                        {filteredLoans.map((account, index) => (
                            <AgentUsers
                                key={index}
                                phoneno={account.User?.Number}
                                fullname={account.User?.Name}
                                address={account?.Address}
                                profilePicture={account.User?.Photo}
                                key1={account.User?.Identifier}
                                id={account?.Loan || account?.Request}
                                amount={account?.Amount}
                                requested={account?.Created}
                                {...account}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Helper function to get the correct icon for each loan type
    function getIcon(type) {
        switch (type) {
            case 'Verified': return <Apartment />;
            case 'Unverified': return <Time />;
            case 'Recovered': return <Hr />;
            case 'Unrecovered': return <Briefcase />;
            default: return null;
        }
    }

    // Helper function to get the correct label for each loan type
    function getLoanTypeLabel(type) {
        switch (type) {
            case 'Verified': return 'In Field Verification';
            case 'Unverified': return 'Pending Field Verification';
            case 'Recovered': return 'Recovered Loan';
            case 'Unrecovered': return 'Unrecovered Loan';
            default: return '';
        }
    }
}

export default UsersUnderAgent;
