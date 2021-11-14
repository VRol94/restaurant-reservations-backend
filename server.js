const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();

const reservations = [
  {
    id: 0,
    name: "Yoshi",
    date: `${new Date().toDateString()} ${new Date().toLocaleTimeString(
      "en-US"
    )}`,
    guestNr: 10,
    email: "yoshi@gmail.com",
  },
  {
    id: 1,
    name: "Crystal",
    date: `${new Date().toDateString()} ${new Date().toLocaleTimeString(
      "en-US"
    )}`,
    guestNr: 50,
    email: "crystal@yahoo.com",
  },
];

const ReservationType = new GraphQLObjectType({
  name: "Reservation",
  description: "Reservation made by a client",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    guestNr: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const RootQueryType = new GraphQLObjectType({
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
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => reservations.find(reservation => reservation.id === args.id)
    }
  }),
});

const RootMutationType = new GraphQLObjectType({
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
        email: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const reservation = { id: reservations.length + 1, name: args.name, date: args.date, guestNr: args.guestNr, email: args.email };
        reservations.push(reservation);
        return reservation;
      }
    },
    updateReservation: {
      type: ReservationType,
      description: "Update a reservation",
      args: {
        id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        guestNr: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const index = reservations.findIndex(reservation => reservation.id === args.id);
        for(let key in reservations[index]) {
          reservations[index][key] = args[key]
        }
        return reservations[index];
      }
    },
    deleteReservation: {
      type: ReservationType,
      description: "Delete a reservation",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        reservations.filter(reservation => reservation.id !== args.id);
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("Server running"));
