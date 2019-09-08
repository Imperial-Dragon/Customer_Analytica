const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const customersRouter = require('./routes/customers')
const extendedCustomerRouter = require('./routes/extendedCustomers')

require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => console.log('connected to database ...'))
    .catch( err => console.log('failed to connect to database ...', err))

const app = express()

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());

app.use('/api/customers',customersRouter);
app.use('/api/extendedCustomers',extendedCustomerRouter);


app.get('/',(req, res) => {
    res.end('Default route.');
});

port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});