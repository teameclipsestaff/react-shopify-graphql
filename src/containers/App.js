import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Home from "./Home";
import Shop from "./Shop";
import Signup from "./Signup";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Product from "./Product";

const client = new ApolloClient({
  uri: "https://mytestreactstore.myshopify.com/api/2020-04/graphql.json",
  headers: {
    "X-Shopify-Storefront-Access-Token": "6f0e809501221878c8de39ed5094ec20",
  },
  // typeDefs: gql`
  //   enum ProductSortKeys {
  //     TITLE
  //     UPDATED_AT
  //     BEST_SELLING
  //     PRICE
  //   }
  // `,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/product/:handle">
              <Product />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

export default App;
