const axios = require('axios');

const dashscope = axios.create({
  baseURL: 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`
  }
});

module.exports = dashscope;