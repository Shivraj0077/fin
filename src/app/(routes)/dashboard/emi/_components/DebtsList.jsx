"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, sql, getTableColumns } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import CreateDebts from "./CreateDebts";
import DebtsItem from "./DebtsItem";
import { debts } from "@/utils/schema";

function DebtsList() {
  const [debtsList, setDebtsList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getDebtsList();
    }
  }, [user]);

  const getDebtsList = async () => {
    const result = await db
      .select({
        ...getTableColumns(debts), // Use the correct table reference
        totalDebts: sql`sum(CAST(${debts.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(debts) // Use the correct table reference
      .where(eq(debts.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(debts.id, debts.name)
      .orderBy(desc(debts.id));

    setDebtsList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateDebts refreshData={() => getDebtsList()} />
        {debtsList.length > 0
          ? debtsList.map((budget, index) => (
              <DebtsItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default DebtsList;
