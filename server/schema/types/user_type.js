const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    email: { type: GraphQLString }, //Only showing email as to not expose passwords
  },
});



module.exports = UserType;