import React from "react";
import InvestmentList from "./_components/InvestementList";

function Income() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Investment Streams</h2>
      <InvestmentList />
    </div>
  );
}

export default Income;