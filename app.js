// Load required packeges
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv')
const morgan = require(`morgan`);
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Connect to process.env 
dotenv.config({ path: './config/config.env' })

// Use morgan
if(process.env.NODE_ENV === `development`) {
    app.use(morgan(`dev`));
}

console.log(process.env.MONGO_URI)

// Add config files
const connectDB = require(`./config/db`);

// Connect to mongodb
connectDB();

// read data in req.body
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// Host the app
const port = process.env.PORT || 3000
app.listen(port, console.log(`connect to port ${port}`));