import { connect } from 'react-redux';
import Dashboard from '../components/dashboard/dashboard';
import { loadInitialState } from '../store/actions/loadInitialState';
import { donateBloodRequest } from '../store/actions/donateBlood';
import { loadUserRequest } from '../store/actions/loadUserData';

function mapStateToProps(state) {
  //here we are mapping the redux state to props so we can use it in our components
  return {
    application: state.application
  };
}

function mapDispatchToProps(dispatch) {
  //Those will be the actions we will be Triggerening from Components
  return {
    loadInitialState    : () => dispatch(loadInitialState()),
    donateBloodRequest        : (userData) => dispatch(donateBloodRequest(userData)),
    loadUserRequest     : () => dispatch(loadUserRequest())
  };
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;