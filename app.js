const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv/config');
app.use(cors());
app.options('*',cors())






// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Router
const productRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');


const api =process.env.API_URL;
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`,categoryRouter)


// connect db
mongoose.connect('mongodb+srv://user:T13062001@cluster0.dt2htwi.mongodb.net/eshop?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("DataBase Connected")
})
.catch((err)=>{
    console.log(err);
});


app.listen(3000, ()=>{
    console.log('Server running http://localhost:3000');
})