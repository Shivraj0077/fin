import React, { createContext, useContext, useState, useEffect } from "react";

const FinancialContext = createContext();

export const useFinancialContext = () => {
  return useContext(FinancialContext);
};

export const FinancialProvider = ({ children }) => {
  const [financialData, setFinancialData] = useState({
    totalBudget: 0,
    totalSpend: 0,
    totalIncome: 0,
    investment: 0,
    savings: 0,
    debts: 0,
    tax: 0,
    target: 10000, // Default target
    financialAdvice: "",
  });

  const [historicalData, setHistoricalData] = useState([]);

  const updateFinancialData = (key, value) => {
    setFinancialData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const updateMultipleFinancialData = (newData) => {
    setFinancialData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const setTarget = (newTarget) => {
    setFinancialData((prevData) => ({
      ...prevData,
      target: newTarget,
    }));
  };

  const updateHistoricalData = () => {
    const newHistoricalPoint = {
      x: new Date().toISOString(), // Use ISO string for accurate timestamp
      totalBudget: financialData.totalBudget,
      totalSpend: financialData.totalSpend,
      totalIncome: financialData.totalIncome,
    };

    // Update historical data and keep only the last 10 entries
    setHistoricalData((prevHistory) => {
      const updatedHistory = [...prevHistory, newHistoricalPoint];
      return updatedHistory.slice(-10); // Keep only the last 10 entries
    });
  };

  useEffect(() => {
    // Update historical data every time financialData changes
    updateHistoricalData();
  }, [financialData]);

  // Log historical data whenever it updates
  useEffect(() => {
    console.log(historicalData);
  }, [historicalData]);

  return (
    <FinancialContext.Provider
      value={{
        financialData,
        updateFinancialData,
        updateMultipleFinancialData,
        setTarget,
        historicalData, // Provide historical data to context
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};
