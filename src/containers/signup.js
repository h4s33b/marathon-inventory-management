import { connect } from 'react-redux';
import SignUp from '../components/signUp/signup';
import { loadInitialState } from '../store/actions/loadInitialState';
import { SignUpRequest } from '../store/actions/signup';
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
    signUpRequest       : (data) => dispatch(SignUpRequest(data))
  };
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;