// utils/classifyExpense.js

const classifyExpense = (category) => {
  const text = category.toLowerCase();

  const necessaryKeywords = [
    "rent", "grocery", "groceries", "food", "gas",
    "electricity", "water", "medical", "insurance",
    "school", "loan", "fees", "bill", "transport"
  ];

  for (let word of necessaryKeywords) {
    if (text.includes(word)) {
      return "necessary";
    }
  }

  return "unnecessary";
};

module.exports = classifyExpense;
