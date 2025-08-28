// utils/classifyExpenseGPT.js
import OpenAI from "openai";
import 'dotenv/config';  // ✅ ensures env variables are loaded before OpenAI

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function classifyExpense(description) {
  try {
    const prompt = `You are a finance assistant. Classify the following expense as either "necessary" or "unnecessary". Only reply with one word.\n\nExpense: "${description}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const answer = response.choices[0].message.content.trim().toLowerCase();
    return answer === "necessary" || answer === "unnecessary" ? answer : "necessary";
  } catch (err) {
    console.error("❌ GPT classification error:", err.message);
    return "necessary";
  }
}


