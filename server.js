const express = require("express");
const { RootMutationType } = require("./reservations-data/rootMutationType");
const { RootQueryType } = require("./reservations-data/rootQueryType");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { GraphQLSchema } = require("graphql");
const cors = require("cors");
const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(cors());
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("Server running"));
