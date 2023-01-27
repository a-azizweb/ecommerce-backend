const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/errorMiddleware');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const dotenv = require('dotenv');
const app = express();

// app.use(express.json());
dotenv.config({ path: 'config/config.env' });

// app.use(express.urlencoded({ limit: '25mb' }));
// app.use(cookieParser());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ecommerce-0rgq.onrender.com'],
  })
);

app.use(fileUpload());

//importing route for products

//this means ('/api/v1/products',(req,res)=>{})
//the '/proucts' and the callback fnc is imported from productRoute.js file
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', payment);

app.use(errorMiddleware);
module.exports = app;
