import { connect } from 'react-redux';
import ViewAllCrimes from '../components/reports/viewAllCrimes';
import { loadInitialState } from '../store/actions/loadInitialState';
import { viewAllCrimesRequest } from '../store/actions/viewAllCrimeRequest';
import { loadUserRequest } from '../store/actions/loadUserData';
import { updateReportRequest } from '../store/actions/addComment';
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
    loadAllCrimesRequest   : () => dispatch(viewAllCrimesRequest()),
    updateReport : (data) => dispatch(updateReportRequest(data))
  };
}

const ViewAllCrimesContainer = connect(mapStateToProps, mapDispatchToProps)(ViewAllCrimes);

export default ViewAllCrimesContainer;