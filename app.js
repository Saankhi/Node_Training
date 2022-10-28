const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://SaankhyaKatari:SaankhyaKatari27@mongodb-practice.xhgwvkd.mongodb.net/?retryWrites=true&w=majority')



app.use((req, res, next) =>{    // headers are sent from server to browser that client is running on to allow access                        
    res.header('Access-Control-Allow-Origin' , '*'); // '*' - value of the browswer link which needs the access    
    res.header('Access-Control-Allow-Header' , 'Origin, X-Requested-With, Content-Type ,Accept,Authorization');

   if (req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Origin' , 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});

   }
   next();
});


app.use(bodyParser.urlencoded({extended: false})); // true allows it to parse rich data , false allows you to parse simple data
app.use(bodyParser.json());

// routes that handle requests
app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);



app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })

});
module.exports = app; 