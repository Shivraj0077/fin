import React from "react";

import SavingList from "./_components/SavingList";

function Saving() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My saving Streams</h2>
      <SavingList />
    </div>
  );
}

export default Saving;