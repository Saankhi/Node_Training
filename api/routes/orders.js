const express = require('express');
const router = express.Router(); // a subpackage of express - reaching diff routes and diff endpoints , enable it by express.Funtion

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders were fetched'
    });
}); 

router.post('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders were created'
    });
}); 

router.get('/:orderID' ,(req, res, next) =>{

     res.status(200).json({
        message: 'Order details',
        orderID: req.params.orderID
    });

});

router.delete('/:orderID' , (req, res, next) =>{

    res.status(200).json({
       message: 'Order deleted',
       orderID: req.params.orderID 
   });

});


module.exports = router;

