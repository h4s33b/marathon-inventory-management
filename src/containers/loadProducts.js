import { connect } from 'react-redux';
import LoadProducts from '../components/products/loadProducts';
import { loadInitialState } from '../store/actions/loadInitialState';
import { loadProductsRequest } from '../store/actions/loadProducts';
import { loadUserRequest } from '../store/actions/loadUserData';
import { childAddedHandler } from '../store/actions/childAddedHandler';

function mapStateToProps(state) {
  //here we are mapping the redux state to props so we can use it in our components
  return {
    application: state.application
  };
}

function mapDispatchToProps(dispatch) {
  childAddedHandler(dispatch);
  //Those will be the actions we will be Triggerening from Components
  return {
    loadInitialState    : () => dispatch(loadInitialState()),
    loadUserRequest     : () => dispatch(loadUserRequest()),
    loadProductsRequest   : (data) => dispatch(loadProductsRequest(data))
  };
}

const LoadProductsContainer = connect(mapStateToProps, mapDispatchToProps)(LoadProducts);

export default LoadProductsContainer;