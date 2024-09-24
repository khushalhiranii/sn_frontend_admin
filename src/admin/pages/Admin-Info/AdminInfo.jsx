import React, { useState } from 'react';



import axiosInstance from '../../../../axios.utils';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';

function AdminInfo() {
    const [approvedDetails, setApprovedDetails] = useState({});
    const [selected, setSelected] = useState([]); // Assuming this was part of your context/state
    
    // Function to update approvedDetails state
    const appendApprovedDetails = (field, value) => {
        setApprovedDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    // Function to submit loan offer
    const OfferLoan = async () => {
        try {
            console.log(approvedDetails);
            console.log(selected); // If selected is relevant to this function

            const response = await axiosInstance.put('/admin/classic/Product', {
                "data": approvedDetails,
            });

            if (response.status === 200) {
                alert("Product Added");
            }
        } catch (error) {
            console.error("Request failed: ", error);
        }
    };

    return (
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">
                Create Loan Product
            </div>

            <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                {/* Input Components for Amount, Interest Rate, and Tenure */}
                <InputComponent
                    label={"Loan Type"}
                    value={approvedDetails?.Type || ''}
                    onChange={(e) => appendApprovedDetails('Type', e.target.value)}
                />

                <InputComponent
                    label={"Amount"}
                    value={approvedDetails?.Amount || ''}
                    onChange={(e) => appendApprovedDetails('Amount', e.target.value)}
                />

                <InputComponent
                    label={"Interest Rate"}
                    value={approvedDetails?.Interest || ''}
                    onChange={(e) => appendApprovedDetails('Interest', e.target.value)}
                />

                <InputComponent
                    label={"Tenure"}
                    value={approvedDetails?.Tenure || ''}
                    onChange={(e) => appendApprovedDetails('Tenure', e.target.value)}
                />

                {/* Dropdown for Interest Type */}
                <div className="flex flex-col w-[333px] box-border items-start justify-normal p-1 gap-2">
                    <div className="tracking-tight text-[14px] leading-[150%] font-medium min-w-[6.438rem]">
                        Interest Type
                    </div>

                    <select
                        className="w-full box-border outline-none text-[1rem] placeholder:text-black1 font-medium border-[#E3E3E3] rounded-[4px] border-[1px] border-solid p-[12px] bg-white"
                        value={approvedDetails?.Mode || ''}
                        onChange={(e) => appendApprovedDetails('Mode', e.target.value)}
                    >
                        <option value="" disabled>Select Option</option>
                        <option value="Reducing">Reducing</option>
                        <option value="Flat">Flat</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-row w-full items-end justify-end">
                <RedButton label="Create a Product" onClick={OfferLoan} />
            </div>
        </div>
    );
}

export default AdminInfo;
