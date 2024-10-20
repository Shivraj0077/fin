import React from "react";
import DebtsList from "./_components/DebtsList";

function debts() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My debts Streams</h2>
      <DebtsList />
    </div>
  );
}

export default debts;