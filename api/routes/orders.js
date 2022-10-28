const express = require('express');
const router = express.Router(); // a subpackage of express - reaching diff routes and diff endpoints , enable it by express.Funtion

const mongoose = require('mongoose') ;
const Order = require('../models/order');
const Product = require('../models/order');


router.get('/', (req, res, next) =>{
   Order.find()
   .select('product quantity _id')
   .exec()
   .then(result => {
        res.status(200).json({
            count: result.length,
            orders: result.map(result => {
                return {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000' + result._id
                    }
                }
            })
        })
   })
   .catch(err => {
        res.status(404).json(err)
   });
}); 

router.post('/', (req, res, next) =>{
    Product.findById(req.body.productId)
           .then(product=> {
            if(!product) {
               return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,          
                quantity: req.body.quantity
        
            });
             return order
            .save()
            
           })

           .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({Error: err})
        })
    }); 

router.get('/:orderId' ,(req, res, next) =>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if(!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err => {
        res.status(404).json({error: err})
    });
});

router.delete('/:orderId' , (req, res, next) =>{
    const id = req.params.orderId;
    Order.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json({
            messsage: 'Order deleted' ,
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: {productId: "ID" , quantity: "Number"}
            } 
        })
    .catch(err => {
        res.status(500).json({error: err})
    })
})
});

module.exports = router


