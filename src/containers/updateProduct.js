import { connect } from 'react-redux';
import UpdateProduct from '../components/products/updateProduct';
import { loadInitialState } from '../store/actions/loadInitialState';
import { updateProductRequest } from '../store/actions/updateProductRequest';
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
    loadInitialState              : () => dispatch(loadInitialState()),
    loadUserRequest               : () => dispatch(loadUserRequest()),
    loadProductsRequest           :  (reportData) => dispatch(loadProductsRequest(reportData)),
    updateProductRequest          : (reportData) => dispatch(updateProductRequest(reportData))
  };
}

const UpdateProductContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);

export default UpdateProductContainer;