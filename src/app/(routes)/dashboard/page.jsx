"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, debts, Expenses, Incomes, investments, savings, tax } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_componets/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { useFinancialContext } from "./context/FinancialContext";
import { FinancialProvider } from "./context/FinancialContext";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [investmentList, setInvestmentList] = useState([]);
  const [savingsList, setSavingsList]=useState([]);
  const [ debtsList , setDebtsList]= useState([]);
  const [ taxList , settaxList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
      getInvestment();
      getSaving();
      getDebt();
      getTax();
      
    }
  }, [user]);

  // Get the budget list
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  // Get the income list
  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(Number),
        })
        .from(Incomes)
        .groupBy(Incomes.id); // Adjust if grouping by another column

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  // Get the investment list
  const getInvestment = async () => {
    const result = await db
      .select({
        id: investments.id,
        name: investments.name,
        totalInvestment: sql`sum(CAST(${investments.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(investments)
      .where(eq(investments.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(investments.id, investments.name)
      .orderBy(desc(investments.id));

    setInvestmentList(result);
  };

  // Get all expenses
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    
  };
  const getSaving = async () => {
    const result = await db
      .select({
        id: savings.id,
        name: savings.name,
        totalSavings: sql`sum(CAST(${savings.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(savings)
      .where(eq(savings.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(savings.id, savings.name)
      .orderBy(desc(savings.id));

    setSavingsList(result);
  };
  const getDebt = async () => {
    const result = await db
      .select({
        id: debts.id,
        name: debts.name,
        totalDebts: sql`sum(CAST(${debts.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(debts)
      .where(eq(debts.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(debts.id, debts.name)
      .orderBy(desc(debts.id));

    setDebtsList(result);
  };
  const getTax = async () => {
    const result = await db
      .select({
        id: tax.id,
        name: tax.name,
        totaltax: sql`sum(CAST(${tax.amount} AS NUMERIC))`.mapWith(Number),
      })
      .from(tax)
      .where(eq(tax.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(tax.id, tax.name)
      .orderBy(desc(tax.id));

    settaxList(result);
  };


  return (
    <FinancialProvider>

    <div className="p-8 bg-">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses.
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} investmentList={investmentList} savingsList={savingsList} debtsList={debtsList} taxList={taxList}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable expensesList={expensesList} refreshData={getBudgetList} />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0 ? (
            budgetList.map((budget, index) => <BudgetItem budget={budget} key={index} />)
          ) : (
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
    </FinancialProvider>
  );
}

export default Dashboard;
