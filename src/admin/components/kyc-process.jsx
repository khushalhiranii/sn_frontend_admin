import React, { useEffect, useState } from "react";
import "../App.css";
import SavingCard from "./saving-card";
import CustomInput from "../../user/DesignSystem/CustomInput";
import { useAdminSocket } from "../context/AdminSocketContext";
import { Photo } from "@mui/icons-material";

function Kycprocess() {
  const [selectedType, setSelectedType] = useState("Approval Request");
  const [userAcc, setUserAcc] = useState([]);
  const { users, userData, accounts } = useAdminSocket();

  // Function to handle button click and set the selected type
  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  // Function to merge data based on status
  const getMergedData = (status) => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const accountArray = Object.values(accounts);

    // Filter users based on the given status and additional conditions
    const filteredUsers = usersArray.filter((user) => {
      const data = userDataArray.find((d) => {
        return d.Identifier === user.Identifier;
      });
      const account = accountArray.find(
        (a) => a.Identifier === user.Identifier
      );
      // Check if the userData has the required Verification status, user Saving is false, and account Status is false
      return (
        data?.Verification == status && // Match the verification status in userData
        user?.Saving == true && // Ensure Saving is false in users
        account?.Status == "Pending" // Ensure account status is false
      );
    });
    // Merge the filtered data based on the "Identifier"
    const mergedData = filteredUsers.map((user) => {
      const data = userDataArray.find((d) => d.Identifier === user.Identifier);
      const account = accountArray.find(
        (a) => a.Identifier === user.Identifier
      );

      // Combine addresses if there are multiple entries
      const mergedAddress = data
        ? Object.values(data.Address.Address).join(", ")
        : "";

      return {
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
        Identifier: user?.Identifier,
        Account: account?.Account,
        Status: selectedType === "Approval Request", // Set Status based on the selectedType
      };
    });

    return mergedData;
  };

  // Get merged data based on the selected type
  const mergedAccounts =
    selectedType === "Approval Request"
      ? getMergedData("Verified")
      : getMergedData("Pending");

  console.log(mergedAccounts);

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
          <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick("Approval Request")}
                className={`navlink2 ${
                  selectedType === "Approval Request" ? "active" : ""
                }`}
              >
                Approval Request
              </button>
            </div>
            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border gap-[0.5rem] w-full text-black">
              <button
                onClick={() => handleButtonClick("Pending KYC Process")}
                className={`navlink2 ${
                  selectedType === "Pending KYC Process" ? "active" : ""
                }`}
              >
                Pending KYC Process
              </button>
            </div>
            <div className="p-[8px]">
              <CustomInput
                placeholder="Search"
                iconSrc="/search.svg"
                className="p-[14px]"
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between px-[16px] box-border">
            {mergedAccounts.map((account, index) => (
              <SavingCard
                key={index}
                phoneno={account.Number}
                fullname={account.Name}
                address={account.Address}
                profilePicture={account.Photo}
                key1={account.Identifier}
                account={account.Account}
                status={account.Status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kycprocess;
