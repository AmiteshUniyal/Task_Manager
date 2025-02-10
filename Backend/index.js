require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/DB');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());


app.use('/api/tasks', require('./Routes/task_routes'));


app.get('/', (req, res) => {
  res.send('Backend is running');
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running`);
  });
}).catch(error => {
  console.error("❌ Database connection failed:", error);
  process.exit(1);
});
