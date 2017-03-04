import React, { Component } from 'react';
import * as mat from 'material-ui';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    Link,
    IndexLink
} from 'react-router';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
        this.donateBlood = this.donateBlood.bind(this);
    }



    componentDidMount() {
        //This is called for Loading Initial State
        this.props.loadUserRequest();
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5)
    }

    donateBlood() {
        this.props.donateBloodRequest(this.props.application.user);
    }

    render() {
        const style = {
            height: 100,
            width: 400,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };
        const customAnchor = {
            textDecoration: 'none',
            color: '#000'
        }
        return (
            <div>
                <div>
                    <mat.Paper style={style} zDepth={3} >
                    <Link to="/addReport" style={customAnchor}><h3>I want to file an Incident.</h3></Link>
                    </mat.Paper>
                    <mat.Paper style={style} zDepth={3} >
                        <Link to="/myIncidents" style={customAnchor}><h3>I Want to Review My Complains.</h3></Link>
                    </mat.Paper>
                </div>
            </div>
        );
    }
}

export default Dashboard;