import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend, investment, savings, debts, tax) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const prompt = ` this should be in bullets points and in string format or it could be in number format
    
    Based on the following financial data:
    - Total Budget: ${totalBudget} rupees
    - Expenses: ${totalSpend} rupees
    - Incomes: ${totalIncome} rupees
    - investment: ${investment} rupees
    - savings: ${savings} rupees
    - debts: ${debts} rupees
    - tax: ${tax} rupees
    
    Please provide a comprehensive financial strategy that includes:
    1. A percentage breakdown of how to allocate the total budget across essential categories (e.g., savings, debts, investments, necessities, tax) with numerical values.
    2. Specific savings goals, such as a target savings amount per month or year.
    3. Recommendations on how to reduce unnecessary expenses by a percentage or amount and how to handle investments.
    4. Suggested investment options based on the current market trends and potential future returns, with estimated returns in percentage.
    5. Analysis of how inflation might affect future expenses and income, and how to adjust your budget accordingly.
    6. Actionable steps to improve cash flow and financial stability over the next year, with specific financial targets.
  
    Provide the information in bullet points, structured as a list with clear, numbered items, making it easy to convert into a graphical format for presentation.
  `;
    console.log('investment', investment);
    console.log('savings', savings);
    console.log('debts', debts);
    console.log('tax', tax);

    // Call the Gemini model to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Process and return the response
    let advice = await result.response.text(); // Call the function to get the text

    // Remove lines containing "** * **" and replace them with a new line
    advice = advice
      .split('\n')
      .filter(line => line.trim() !== '** * **') // Remove lines containing only "** * **"
      .join('\n'); // Join the remaining lines back into a single string

    console.log(advice);
    return advice || "No advice received."; // Handle missing advice
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
