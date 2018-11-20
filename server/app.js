const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
    //schema
}));

app.listen(4000, () => {
    console.log('Started on port 4000. Listening for requests');
});