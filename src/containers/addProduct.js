import { connect } from 'react-redux';
import AddProduct from '../components/products/addProduct';
import { loadInitialState } from '../store/actions/loadInitialState';
import { addProductRequest } from '../store/actions/addProductRequest';
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
    addProductRequest          : (reportData) => dispatch(addProductRequest(reportData))
  };
}

const AddProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddProduct);

export default AddProductContainer;