const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt } = graphql;

//dummy data
let dummyBooks = [
    { name: "Ender's game", genre: "Sci-Fi", id: "1" },
    { name: "Mort", genre: "Fantasy", id: "2" },
    { name: "The killing joke", genre: "Comic", id: "3" }
];

let dummyAuthors = [
    { name: 'Orson Scott Card', age: 67, id: '1' },
    { name: 'Terry Pratchett', age: 66, id: '2' },
    { name: 'Alan Moore', age: 65, id: '3' }
];

const BookType = new GraphQLObjectType({    //--> as the name tells us, it defines the object on which we can search
    name: 'Book',
    fields: () => ({                        //--> needs to be a function due to make the search available
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {                             //--> it defines the query
            type: BookType,
            args: { id: { type: GraphQLID } },   //as the name tells us, it defines the argument on the ==> search book(id: '23')
            resolve(parent, args) {                 //--> code to get the data, here is where the HOW is set
                return _.find(dummyBooks, { id: args.id });

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(dummyAuthors, { id: args.id });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
