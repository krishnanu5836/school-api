const express = require('express');
const dotenv = require('dotenv');
const schoolsRouter = require('./routes/schools');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', schoolsRouter);

app.get('/', (req, res) => {
  res.send('School Management API - alive');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
