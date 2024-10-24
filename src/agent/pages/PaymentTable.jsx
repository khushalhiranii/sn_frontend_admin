import React from 'react';

const PaymentTable = ({ transactions }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="w-full text-black">
      <h3 className="text-[16px] text-slate-800 leading-[150%] font-semibold">Previous Payment Details</h3>
      <table className="w-full table-auto border- rounded">
        <thead>
          <tr className="bg-[#E6F0FC] text-left">
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Identifier</th>
            <th className="border px-4 py-2">Reference</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {hasTransactions ? (
            transactions.map((transaction, index) => (
              <tr
                key={transaction._id}
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
              >
                <td className="border px-4 py-2">₹{transaction.Amount.toLocaleString()}</td>
                <td className="border px-4 py-2">{transaction.Created}</td>
                <td className="border px-4 py-2">{transaction.Key}</td>
                <td className="border px-4 py-2">{transaction.Reference}</td>
                <td
                  className={`border px-4 py-2 ${
                    transaction.Status === 'Credit' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.Status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center text-gray-500">
                No transactions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default PaymentTable;
