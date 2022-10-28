const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose'); // a subpackage of express - reaching diff routes and diff endpoints , enable it by express.Funtion
 
const Product = require('../models/product');


router.get('/', (req, res, next) =>{
   Product.find()
   .exec()
   .then(result => {
    console.log(result);
    res.status(200).json(result);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({Error: err});
   })
});


router.post('/product', (req, res, next) =>{
    const product =  new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,          
        price: req.body.price
    });
      product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message:'Handling POST requests to /products',
            createdProduct: product 
      })
    })
      .catch(err => {console.log(err);
      res.status(500).json({
        error:err
      });
    });
  
});


router.put('/', (req, res, next) =>{
    res.status(200).json({
        message:'Handling PUT requests to /products'
    });
});

router.get('/:productId' ,(req, res, next) =>{
    const id = req.params.productId;
     Product.findById(id)
     .exec()
     .then(result => {
        console.log(result);
        res.status(201).json(result);
     })
     .catch(err => {
        console.log(err);
        res.status(500).json({Error: err});
     })
    });

router.patch('/:productID' ,(req, res, next) =>{
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productID' , (req, res, next) =>{
   const id = req.params.productID;
   Product.remove({_id: id}) 
   .exec()
   .then(result => {
    console.log(result);
    res.status(200).json(result)
   }) 
   .catch(err => {
    console.log(err);
    res.status(500).json({Error: err})
   })
});

module.exports = router