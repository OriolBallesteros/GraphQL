const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({ //--> as the name tells us, it defines the object on which we can search
    name: 'Book',
    fields: () => ({ //--> needs to be a function due to make the search available
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});
