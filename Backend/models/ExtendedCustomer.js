const mongoose = require('mongoose');

const ExtendedCustomer = mongoose.model('ExtendedCustomer', mongoose.Schema({
    accountID : String,
    name : String,
    age : Number, 
    gender : String, 
    married : String,
    income : Number,
    dependents : Number,
    occupation : String,
    credit_worthy : String,
    liabilities : String,
    risk_level : String, 
    threshold : String,
    loan_amount : Number, 
    Deposits : Number,
    bank_relationship : String,
    buying_preference : String,
    repayment_pattern : String,
    transaction_history : String,
    interests : String,
    activities : String,
    values : String,
    attributes : String,
    home_address : String,
    company_name : String,
    company_address : String,
}));

module.exports = ExtendedCustomer;