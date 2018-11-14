const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type");

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        //req.user will contain user if user is signed in. Otherwise null or undefined
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
