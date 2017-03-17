import { connect } from 'react-redux';
import LoadSales from '../components/stores/loadSales';
import { loadInitialState } from '../store/actions/loadInitialState';
import { loadSalesRequest } from '../store/actions/loadSales';
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
    loadSalesRequest   : (data) => dispatch(loadSalesRequest(data))
  };
}

const LoadSalesContainer = connect(mapStateToProps, mapDispatchToProps)(LoadSales);

export default LoadSalesContainer;