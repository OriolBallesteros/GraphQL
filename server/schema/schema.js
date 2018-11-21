const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({    //--> as the name tells us, it defines the object on which we can search
    name: 'Book',
    fields: () => ({                        //--> needs to be a function due to make the search available
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {                             //--> it defines the query
            type: BookType,
            args: { id: { type: GraphQLString } },   //as the name tells us, it defines the argument on the ==> search book(id: '23')
            resolve(parent, args){
                //code to get the data, here is where the HOW is set
                
            }
        }                                   
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
