require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const port = process.env.PORT || 6000;
const app = express();
const cors=require('cors')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}));
app.get('/', require('./routes/authRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});