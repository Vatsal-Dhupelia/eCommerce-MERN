import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from './component/Home/Home.js'
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from './component/Product/Products.js';
import ScrollToTop from './component/ScrollToTop';

function App() {

  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  
  return (
    <>
    <Router>
      <ScrollToTop/>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route path="/products/:keyword" component={Products}/>
      <Footer/>
    </Router>
    </>

  );
}

export default App;
