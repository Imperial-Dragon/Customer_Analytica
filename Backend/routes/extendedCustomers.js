const express = require('express')

const ExtendedCustomer = require('../models/ExtendedCustomer');

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);

    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findFilteredData = {};
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'income' || key === 'loan_amount'){
                findFilteredData[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                if(key === 'credit_worthy'){
                    findFilteredData[key] = "Satisfactory CIBIL Score Verified From Bank Statements";
                }else if(key === 'risk_level'){
                    findFilteredData[key] = {$in:req.body.filters[key]}
                }
            }
        }
    }

    ExtendedCustomer.
    find(findFilteredData).
    skip(skip).
    limit(limit).
    exec((err,result)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: result.length,
            result
        })
    })
});

module.exports = router;