import React, { useEffect, useState } from "react";
import { useFinancialContext } from "../context/FinancialContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const ChatBot = () => {
  const { financialData } = useFinancialContext(); // Access global financial data
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (userInput.trim()) {
      // Add user message
      setMessages((prev) => [
        ...prev,
        { text: userInput, sender: "user" },
      ]);
      setUserInput("");

      // Generate bot response
      const botResponse = await generateResponse(userInput);
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: "bot" },
      ]);
    }
  };

  const generateResponse = async (input) => {
    // Prompt for generating financial advice based on user's data and query
    const prompt = `You are a financial advisor chatbot, and you have access to the following user's financial data:
    - Total Budget: ${financialData.totalBudget} rupees
    - Expenses: ${financialData.totalSpend} rupees
    - Incomes: ${financialData.totalIncome} rupees
    - Investments: ${financialData.investment} rupees
    - Savings: ${financialData.savings} rupees
    - Debts: ${financialData.debts} rupees
    - Tax: ${financialData.tax} rupees

    Based on this data, answer the following user query:

    "${input}"

    Provide actionable financial advice and suggestions that help the user achieve their financial goals. Respond clearly, using numbered points where applicable.Mostly give responses based on numbers rather than giving paragraph based advices`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      let advice = await result.response.text();

      // Format advice, removing unnecessary content
      advice = advice
        .split('\n')
        .filter(line => line.trim() !== '** * **') // Remove any irrelevant lines
        .join('\n');

      return advice || "No advice available at the moment.";
    } catch (error) {
      console.error("Error fetching financial advice:", error);
      return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot">
      <div id="chat-container" className="overflow-auto h-96 border p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area flex mt-4 rounded-lg">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="border rounded-l p-2 flex-grow"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white rounded-r p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
