import { connect } from 'react-redux';
import AddStore from '../components/stores/addStore';
import { loadInitialState } from '../store/actions/loadInitialState';
import { addStoreRequest } from '../store/actions/addStore';
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
    addStoreRequest          : (reportData) => dispatch(addStoreRequest(reportData))
  };
}

const AddStoreContainer = connect(mapStateToProps, mapDispatchToProps)(AddStore);

export default AddStoreContainer;