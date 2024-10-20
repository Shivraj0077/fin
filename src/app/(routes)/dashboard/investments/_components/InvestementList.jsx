"use client";
import React, { useEffect, useState } from "react";
import CreateInvestment from "./CreateInvestments";
import { db } from "@/utils/dbConfig";
import { desc, eq, sql ,getTableColumns } from "drizzle-orm";
import { investments } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import InvestmentItem from "./InvestementItem";


function InvestmentList() {
  const [investment, setInvestment] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getInvestment();
  }, [user]);

  const getInvestment = async () => {
    const result = await db
      .select({
        ...getTableColumns(investments),
        totalInvestment: sql`sum(CAST(${investments.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(investments)
      .where(eq(investments.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(investments.id, investments.name)
      .orderBy(desc(investments.id));

    setInvestment(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateInvestment refreshData={() => getInvestment()} />
        {investment?.length > 0
          ? investment.map((budget, index) => (
              <InvestmentItem budget={budget} key={index} />
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

export default InvestmentList;
