import React from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.css";

import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/category/:categoryId"
          component={ItemListContainer}
        />
        <Route exact path="/item/:itemId" component={ItemDetailContainer} />
        <Route exact path="/cart" component={Cart} />
        {/* <Route path="/404" component={ErrorPage} />
        <Redirect to="/404" /> */}
        <Footer />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;
