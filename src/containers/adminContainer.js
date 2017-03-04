import { connect } from 'react-redux';
import AdminDashboard from '../components/dashboard/adminDashboard';
import { loadInitialState } from '../store/actions/loadInitialState';
import { donateBloodRequest } from '../store/actions/donateBlood';
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
    donateBloodRequest        : (userData) => dispatch(donateBloodRequest(userData)),
    loadUserRequest     : () => dispatch(loadUserRequest())
  };
}

import React, { Component } from 'react';

class adminRoot extends Component {
    render() {
        return (
            <div>
            <AdminDashboard />
                {this.props.children}
            </div>
        );
    }
}

const adminDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(adminRoot);

export default adminDashboardContainer;