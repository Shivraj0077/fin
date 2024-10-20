"use client";
import React, { useEffect, useState } from "react";
import CreateSaving from "./CreateSavings";
import { db } from "@/utils/dbConfig";
import { desc, eq, sql ,getTableColumns } from "drizzle-orm";
import { savings } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import SavingItem
 from "./SavingItem";
 function SavingList() {
    const [saving, setSaving] = useState([]);
    const { user } = useUser();
  
    useEffect(() => {
      user && getSaving();
    }, [user]);
    const getSaving = async () => {
        const result = await db
          .select({
            ...getTableColumns(savings),
            totalSavings: sql`sum(CAST(${savings.amount} AS NUMERIC))`.mapWith(Number),
          })
          .from(savings)
          .where(eq(savings.createdBy, user?.primaryEmailAddress?.emailAddress))
          .groupBy(savings.id, savings.name)
          .orderBy(desc(savings.id));
    
        setSaving(result);
      };

      return (
        <div className="mt-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <CreateSaving refreshData={() => getSaving()} />
            {saving?.length > 0
              ? saving.map((budget, index) => (
                  <SavingItem budget={budget} key={index} />
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
    
    export default SavingList;

