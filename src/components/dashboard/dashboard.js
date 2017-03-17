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
                        <h3>This is Dashboard. For your convenience I have added a side menu.</h3>
                    </mat.Paper>
                </div>
            </div>
        );
    }
}

export default Dashboard;