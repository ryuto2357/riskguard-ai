require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 RiskGuard AI Backend running on port ${PORT}`);
});