const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    amount: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    previousLocation: {
      type: String,
      required: true
    },

    deviceChanged: {
      type: Boolean,
      required: true
    },

    hour: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    },

    dailyFrequency: {
      type: Number,
      required: true
    },

    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      required: true,
      index: true
    },

    flagged: {
      type: Boolean,
      required: true
    },

    explanation: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);