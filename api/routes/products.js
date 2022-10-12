const express = require('express');
const router = express.Router(); // a subpackage of express - reaching diff routes and diff endpoints , enable it by express.Funtion

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message:'Handling GET requests to /products'
    });
});


router.post('/', (req, res, next) =>{
    res.status(200).json({
        message:'Handling POST requests to /products'
    });
});


router.put('/', (req, res, next) =>{
    res.status(200).json({
        message:'Handling PUT requests to /products'
    });
});

router.get('/:productID' ,(req, res, next) =>{
    const id = req.params.productID; // params is for url. 
    if (id == 'special'){
        res.status(200).json({
            message: 'You discovered the spcial ID', // , for differntiating the lines.
            id: id 
        });
    }  else{
        res.status(200).json({
            message: 'You passed the ID'
        });
    }
});

router.patch('/:productID' ,(req, res, next) =>{
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productID' , (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted product'
    });
});

module.exports = router;

