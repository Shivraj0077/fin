"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, sql, getTableColumns } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { tax } from "@/utils/schema";
import CreateTax from "./CreateTax";
import TaxItem from "./TaxItem";

function TaxListt() {
  const [TaxList, setTaxList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getTaxList();
    }
  }, [user]);

  const getTaxList = async () => {
    const result = await db
      .select({
        ...getTableColumns(tax), // Use the correct table reference
        totalTax: sql`sum(CAST(${tax.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(tax) // Use the correct table reference
      .where(eq(tax.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(tax.id, tax.name)
      .orderBy(desc(tax.id));

    setTaxList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateTax refreshData={() => getTaxList()} />
        {TaxList.length > 0
          ? TaxList.map((budget, index) => (
              <TaxItem budget={budget} key={index} />
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

export default TaxListt;
