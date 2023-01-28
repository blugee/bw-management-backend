const express = require('express');
require('dotenv').config()
const app = express();
const indexRouters = require('./routes/indexRoutes');
const PORT = process.env.PORT || 5050;
const cors = require('cors');
const morgan = require('morgan')
const { connectDB } = require("./config/db")
connectDB()

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/', indexRouters);
app.get('/', async (req, res) => {
    res.send('Welcome To User Management System')
})
// server is running on ...
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});