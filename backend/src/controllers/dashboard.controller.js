const Transaction = require('../models/Transaction.model');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();

    const highRisk = await Transaction.countDocuments({ riskLevel: "HIGH" });
    const mediumRisk = await Transaction.countDocuments({ riskLevel: "MEDIUM" });
    const lowRisk = await Transaction.countDocuments({ riskLevel: "LOW" });

    return res.status(200).json({
      success: true,
      data: {
        totalTransactions,
        highRisk,
        mediumRisk,
        lowRisk
      }
    });

  } catch (error) {
    console.error("❌ Dashboard Stats Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};