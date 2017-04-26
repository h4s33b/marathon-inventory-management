import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import LoginContainer from './containers/login';
import SignUpContainer from './containers/signup';
import rootMainContainer from './containers/rootContainer';
import DashboardContainer from './containers/dashboard';
import AddProductContainer from './containers/addProduct';
import AddStoreContainer from './containers/addStore';
import UpdateProductContainer from './containers/updateProduct';
import AddSalesContainer from './containers/addSales';
import AddPurchaseContainer from './containers/addPurchase';
import LoadProductsContainer from './containers/loadProducts';
import LoadSalesContainer from './containers/loadSales';
import LoadPurchaseContainer from './containers/loadPurchase';
import ViewAllCrimesContainer from './containers/viewAllCrimes';
import adminDashboardContainer from './containers/adminContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import * as mat from 'material-ui';

import {
  browserHistory,
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
  Link,
  IndexLink
} from 'react-router';

class RootComponent extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Provider store={store}>
            <Router history={browserHistory}>
              <Route path="/" component={rootMainContainer}>
                <IndexRedirect to="/login" />
                <Route path="/dashboard" component={LoadProductsContainer} />
                <Route path="/addProduct" component={AddProductContainer} />
                <Route path="/updateProduct/:productId" component={UpdateProductContainer} />
                <Route path="/addStore" component={AddStoreContainer} />
                <Route path="/addSales" component={AddSalesContainer} />
                <Route path="/viewSales" component={LoadSalesContainer} />
                <Route path="/addPurchase" component={AddPurchaseContainer} />
                <Route path="/viewPurchase" component={LoadPurchaseContainer} />
                <Route path="/viewProducts" component={LoadProductsContainer} />
                <Route path="/viewAllCrimes" component={ViewAllCrimesContainer} />
              </Route>
              <Route path="/login" component={LoginContainer}>
              </Route>
              <Route path="/signup" component={SignUpContainer}>
              </Route>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render((
  <RootComponent />
),
  document.getElementById('root')
);
