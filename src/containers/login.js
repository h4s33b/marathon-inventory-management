import { connect } from 'react-redux';
import Login from '../components/login/login';
import { loadInitialState } from '../store/actions/loadInitialState';
import { loginRequest } from '../store/actions/login';
import { childAddedHandler } from '../store/actions/childAddedHandler';

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
    loginRequest        : (userData) => dispatch(loginRequest(userData))
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;