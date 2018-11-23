const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb://eric:test123@ds247310.mlab.com:47310/gql')

mongoose.connection.once('open', () => {
    console.log('Connected to database!');
});

app.use('/graphql', graphqlHTTP({
    //schema
    schema,
    graphiql: true      //--> with this simple set up we make graphiql available
}));

app.listen(4000, () => {
    console.log('Started on port 4000. Listening for requests');
});