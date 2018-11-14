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
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req){
        //save reference to user on req object for Passport
        const { user } = req;
        //Must have reference to user property on req object for passport logout to work
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req){
        return AuthService.login({email, password, req});
      }
    }
  }
});

module.exports = mutation;