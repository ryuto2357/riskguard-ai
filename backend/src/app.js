const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'RiskGuard AI backend is running'
  });
});

const transactionRoutes = require('./routes/transaction.routes');

app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

module.exports = app;
