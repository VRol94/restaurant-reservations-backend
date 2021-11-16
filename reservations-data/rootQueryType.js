const { reservations } = require("../constants");
const { ReservationType } = require("./reservationType");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = require("graphql");
exports.RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    reservations: {
      type: new GraphQLList(ReservationType),
      description: "List of reservations",
      resolve: () => reservations,
    },
    reservation: {
      type: ReservationType,
      description: "Single reservation",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        reservations.find((reservation) => reservation.id === args.id),
    },
  }),
});
