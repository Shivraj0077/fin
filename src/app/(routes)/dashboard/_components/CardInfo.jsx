import { formatNumber } from "@/utils/formatNumber";
import getFinancialAdvice from "@/utils/getFinacialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { useFinancialContext } from "../context/FinancialContext";
import ChatBot from "./ChatBot";
import FinancialProgressGraph from "../target/FinancialProgressGraph ";

function CardInfo({ budgetList, incomeList, investmentList, savingsList, debtsList, taxList }) {
  const { financialData, updateMultipleFinancialData } = useFinancialContext();

  

  const CalculateCardInfo = useCallback(() => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;
    let totalInvestment_ = 0;
    let totalSavings_ = 0;
    let totalDebts_ = 0;
    let totalTax_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount) || 0;
      totalSpend_ += Number(element.totalSpend) || 0;
    });

    incomeList.forEach((element) => {
      totalIncome_ += Number(element.totalAmount) || 0;
    });

    investmentList.forEach((element) => {
      totalInvestment_ += Number(element.totalInvestment) || 0;
    });

    savingsList.forEach((element) => {
      totalSavings_ += Number(element.totalSavings) || 0;
    });

    debtsList.forEach((element) => {
      totalDebts_ += Number(element.totalDebts) || 0;
    });

    taxList.forEach((element) => {
      totalTax_ += Number(element.totalTax) || 0;
    });

    // Update global state
    updateMultipleFinancialData({
      totalBudget: totalBudget_,
      totalSpend: totalSpend_,
      totalIncome: totalIncome_,
      investment: totalInvestment_,
      savings: totalSavings_,
      debts: totalDebts_,
      tax: totalTax_,
      target: financialData.target || 1000,  // Use existing target or default to 10000
    });
    
    
    // Get financial advice
    getFinancialAdvice(totalBudget_, totalIncome_, totalSpend_, totalInvestment_, totalSavings_, totalDebts_, totalTax_)
      .then(advice => {
        updateMultipleFinancialData({
          financialAdvice: advice,
        });
      })
      .catch(err => {
        console.error("Error fetching financial advice:", err);
      });
  }, [budgetList, incomeList, investmentList, savingsList, debtsList, taxList, updateMultipleFinancialData]);

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList, investmentList, savingsList, debtsList, taxList]);

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex mb-2 flex-row space-x-1 items-center">
                <h2 className="text-md">Finan Smart AI</h2>
                <Sparkles className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate" />
              </div>
              <h2 className="font-light text-md">
                {financialData.financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.totalBudget)}</h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.totalSpend)}</h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. Of Budget</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.totalIncome)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Investments</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.investment)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Savings</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.savings)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm">Sum of Debts</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.debts)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm">Sum of Tax</h2>
                <h2 className="font-bold text-2xl">${formatNumber(financialData.tax)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>

          <FinancialProgressGraph/>

          {/* Render the ChatBot component here */}
          <ChatBot className="mt-14"/>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg" key={index}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
