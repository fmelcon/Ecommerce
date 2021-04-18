import React from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/category/:categoryId" component={ItemListContainer} />
        <Route path="/item/:itemId" component={ItemDetailContainer} />
        <Route path="/cart" component={Cart} />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
