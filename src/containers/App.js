import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Shop from "./Shop";
import Signup from "./Signup";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Product from "./Product";

const App = () => {
  return (
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
          <Route path="/product/:id">
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
  );
};

export default App;
