import React, { Component } from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
//import{NavLink} from 'react-router';
import Home from './Home/Home'
import Product from './Product/Product'
import Header from './Share/Header'
import PaymentType from './PaymentType/PaymentType';
import Tax from './Tax/Tax';
import UserType from './UserType/UserType';
import ProductType from './ProductType/ProductType';



import './App.css';

class App extends Component {
  render() {
    return (    
<BrowserRouter>
<div>
<Header/>
<Switch>
<Route path="/" exact component={Home}/>
<Route path="/product" component={Product}/>
<Route path="/paymenttype" component={PaymentType}/>
<Route path="/tax" component={Tax}/>
<Route path="/usertype" component={UserType}/>
<Route path="/producttype" component={ProductType}/>
</Switch>
</div>
</BrowserRouter>
      
    );
  }
}

export default App;
