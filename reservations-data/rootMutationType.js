const { reservations } = require("../constants");
const { ReservationType } = require("./reservationType");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
exports.RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addReservation: {
      type: ReservationType,
      description: "Add a reservation",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        guestNr: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const reservation = {
          id: reservations.length + 1,
          name: args.name,
          date: args.date,
          guestNr: args.guestNr,
          email: args.email,
        };
        reservations.push(reservation);
        return reservation;
      },
    },
    updateReservation: {
      type: ReservationType,
      description: "Update a reservation",
      args: {
        id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        guestNr: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const index = reservations.findIndex(
          (reservation) => reservation.id === args.id
        );
        for (let key in reservations[index]) {
          reservations[index][key] = args[key];
        }
        return reservations[index];
      },
    },
    deleteReservation: {
      type: ReservationType,
      description: "Delete a reservation",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const index = reservations.findIndex(
          (reservation) => reservation.id === args.id
        );
        reservations.splice(index, 1);
        return index;
      },
    },
  }),
});
