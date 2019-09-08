const express = require('express')

const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', (req, res) => {
    Customer.find({}, {_id : 0})
        .limit(10)
        .then((docs) => {
            res.status(200);
            res.setHeader('Content-Type','application/json');
            res.send(JSON.stringify(docs));
        })
        .catch((err) => {
            res.status(500);
            res.end('Failed' + JSON.stringify(err));
        });
});

router.post('/', (req, res) => {
    console.log(req.body);

    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findFilteredData = {};
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'income' || key === 'bankLoyalty' || key === 'loanAvailed'){
                findFilteredData[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findFilteredData[key] = {$in:req.body.filters[key]}
            }
        }
    }

    Customer.
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

router.get('/:id', (req, res) => {
    Customer.findOne({
        accountID : req.params.id
    }, {_id : 0}, (err, docs) => {
        if(err || !docs) {
            console.log(docs);
            res.status(500).json({'err' : 'Internal server error'});
        }else{
            res.status(200).json(docs);
        }
    });
})

module.exports = router;