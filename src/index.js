import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Dashboard from './components/dashboard';
import Login from './components/Login/Login';
import Register from './components/Signup/register';
import Category from './components/Products/Category.js';
import Products from './components/Products/Products';
import AddProduct from './components/Products/AddProduct';
import Invoice from './components/invoice';
import Datatable from './components/common/datatable';
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
import Reports from './components/reports/report';
import Profile from './components/settings/profile';
import Reset from './components/Reset/Reset';
import ListUser from './components/users/list-user';
import CreateUser from './components/users/create-user';
import ListSeller from './components/sellers/list-seller';
import ListCoupon from './components/coupons/list-coupons';
import CreateCoupon from './components/coupons/create-coupons';
import ListTaxes from './components/Taxes/list-taxes';
import CreateTaxes from './components/Taxes/create-taxes';


window.store = store;

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                    <Route exact path="/" component={Login} />
                        <Route exact path="/signin" component={Login} />
                        <Route exact path="/signup" component={Register} />
                        <Route exact path="/reset-password" component={Reset} />
                        

                        <App>
                            <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                            <Route path={`${process.env.PUBLIC_URL}/category`} component={Category} />
                            <Route path={`${process.env.PUBLIC_URL}/products`} component={Products} />
                            <Route path={`${process.env.PUBLIC_URL}/add-products`} component={AddProduct} />
                            <Route path={`${process.env.PUBLIC_URL}/list-taxes`} component={ListTaxes} />
                            <Route path={`${process.env.PUBLIC_URL}/create-taxes`} component={CreateTaxes} />
                            <Route path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />
                            <Route path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} /> 
                            <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
                            <Route path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />
                            <Route path={`${process.env.PUBLIC_URL}/report`} component={Reports} />
                            <Route path={`${process.env.PUBLIC_URL}/list-user`} component={ListUser} />
                            <Route path={`${process.env.PUBLIC_URL}/create-user`} component={CreateUser} />
                            <Route path={`${process.env.PUBLIC_URL}/list-seller`} component={ListSeller} />
                            <Route path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />
                            <Route path={`${process.env.PUBLIC_URL}/list-coupon`} component={ListCoupon} />
                            <Route path={`${process.env.PUBLIC_URL}/create-coupon`} component={CreateCoupon} />
                                
                            {/*  

                           

                            
                            <Route path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

                             */}

                           

                            

                        </App>
                    </Switch>
                </ScrollContext>
            </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


