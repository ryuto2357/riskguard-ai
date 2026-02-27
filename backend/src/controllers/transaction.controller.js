const Transaction = require('../models/Transaction.model');
const { analyzeFraud } = require('../services/fraudAI.service');

exports.createTransaction = async (req, res) => {
  try {
    const {
      userId,
      amount,
      location,
      previousLocation,
      deviceChanged,
      hour,
      dailyFrequency
    } = req.body;

    // Basic validation (simple but important)
    if (
      !userId ||
      amount === undefined ||
      !location ||
      !previousLocation ||
      deviceChanged === undefined ||
      hour === undefined ||
      dailyFrequency === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 🔥 Call AI Fraud Analysis
    const aiResult = await analyzeFraud({
      amount,
      location,
      previousLocation,
      deviceChanged,
      hour,
      dailyFrequency
    });

    // Extract AI response safely
    const riskScore = aiResult.risk_score;
    const riskLevel = aiResult.risk_level;
    const flagged = aiResult.flagged;
    const explanation = aiResult.explanation;

    // Save to database
    const transaction = await Transaction.create({
      userId,
      amount,
      location,
      previousLocation,
      deviceChanged,
      hour,
      dailyFrequency,
      riskScore,
      riskLevel,
      flagged,
      explanation
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });

  } catch (error) {
    console.error("❌ Transaction Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { riskLevel } = req.query;

    let filter = {};

    if (riskLevel) {
      filter.riskLevel = riskLevel;
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });

  } catch (error) {
    console.error("❌ Get Transactions Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};