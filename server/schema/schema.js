const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

//-------dummy data------
let dummyBooks = [
    { name: "Ender's game", genre: "Sci-Fi", id: "1", authorId: "1" },
    { name: "Mort", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The killing joke", genre: "Comic", id: "3", authorId: "3" },
    { name: "The colour of magic", genre: "Fantasy", id: "4", authorId: "2" },
    { name: "The light fantastic", genre: "Fantasy", id: "5", authorId: "2" },
    { name: "Speaker for the dead", genre: "Sci-Fi", id: "6", authorId: "1" }

];

let dummyAuthors = [
    { name: 'Orson Scott Card', age: 67, id: '1' },
    { name: 'Terry Pratchett', age: 66, id: '2' },
    { name: 'Alan Moore', age: 65, id: '3' }
];
//--------------------------


const BookType = new GraphQLObjectType({    //--> as the name tells us, it defines the object on which we can search
    name: 'Book',
    fields: () => ({                        //--> needs to be a function due to make the search available
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {          //--> resolve() defines how the search will be done and how the data will be foudn
                //it first argument, parent, is used when nested searchs; the second argument, args, when we use a direct query search
                console.log(parent);
                return _.find(dummyAuthors, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        booksList: {
            type: new GraphQLList(BookType),        
            resolve(parent, args) {
                return _.filter(dummyBooks, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {                             //--> it defines the query
            type: BookType,
            args: { id: { type: GraphQLID } },   //as the name tells us, it defines the argument on the ==> search book(id: '23')
            resolve(parent, args) {                 //--> code to get the data, here is where the HOW is set //--> resolve() defines how the search will be done and how the data will be foudn. it first argument, parent, is used when nested searchs; the second argument, args, when we use a direct query search
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
