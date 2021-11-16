const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

exports.ReservationType = new GraphQLObjectType({
  name: "Reservation",
  description: "Reservation made by a client",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    guestNr: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
