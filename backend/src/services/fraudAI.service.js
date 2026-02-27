const dashscope = require('../config/dashscope');

exports.analyzeFraud = async (transactionData) => {
  const prompt = `
You are an advanced financial fraud detection AI.

Analyze the transaction below and determine fraud risk.

Risk factors:
- Very high transaction amount
- Sudden location change
- Device change
- Activity between 00:00–04:00
- High daily transaction frequency

Return ONLY valid JSON:
{
  "risk_score": number (0-100),
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "flagged": true | false,
  "explanation": "short explanation"
}

Transaction:
${JSON.stringify(transactionData)}
`;

  const response = await dashscope.post('', {
    model: "qwen-turbo",
    input: {
      messages: [
        { role: "user", content: prompt }
      ]
    }
  });

  const text = response.data.output.text;

  return JSON.parse(text);
};