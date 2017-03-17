import { connect } from 'react-redux';
import AddPurchase from '../components/purchase/addPurchase';
import { loadInitialState } from '../store/actions/loadInitialState';
import { addPurchasesRequest } from '../store/actions/addPurchase';
import { loadUserRequest } from '../store/actions/loadUserData';
import { loadstoresRequest } from '../store/actions/loadStores';
import { loadProductsRequest } from '../store/actions/loadProducts';
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
    loadstoresRequest          : (reportData) => dispatch(loadstoresRequest(reportData)),
    loadProductsRequest   : (data) => dispatch(loadProductsRequest(data)),
    addPurchasesRequest  : (data) => dispatch(addPurchasesRequest(data))
  };
}

const AddPurchaseContainer = connect(mapStateToProps, mapDispatchToProps)(AddPurchase);

export default AddPurchaseContainer;