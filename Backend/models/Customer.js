const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', mongoose.Schema({
    accountID : String,
    name : String,
    demographic : {
        age : Number, 
        gender : String, 
        married : String,
        income : Number,
        dependents : Number,
        occupation : String
    },
    financial : {
        credit_worthy : String,
        liabilities : String,
        risk_level : String, 
        threshold : String,
        loan_amount : Number, 
        Deposits : Number
    },
    behavioural : {
        bank_relationship : String,
        buying_preference : String,
        repayment_pattern : String,
        transaction_history : String
    }, 
    psychographic : {
        interests : String,
        activities : String,
        values : String,
        attributes : String
    }, 
    geographic : {
        home_address : String,
        company_name : String,
        company_address : String
    }
}));

module.exports = Customer;