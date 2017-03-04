import React, { Component } from 'react';
import * as mat from 'material-ui';
import Moment from 'react-moment';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} from 'react-router';

class AdminDashboard extends Component {
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
                <mat.Paper style={style} zDepth={3} >
                        <Link to="/viewCrimes" style={customAnchor}><h3>Review Complains</h3></Link>
                    </mat.Paper>
            </div>
        );
    }
}

export default AdminDashboard;