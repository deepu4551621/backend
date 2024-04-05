require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const cors=require('cors')
const appRoutes =require('./routes/authRoutes')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods:['GET', 'POST','PUT','DELETE'],
  credentials:true
}));
app.use('/', appRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});