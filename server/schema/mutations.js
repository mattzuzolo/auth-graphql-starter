const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      //req param is the request object coming from express
      resolve(parentValue, { email, password }, req){
        //must use return because below function is async
        //GraphQL will wait to return it
        return AuthService.signup({ email, password, req })
      }
    }
  }
});

module.exports = mutation;