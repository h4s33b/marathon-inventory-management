import React, { Component } from 'react';
import * as mat from 'material-ui';
import Moment from 'react-moment';
import './logo.css';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} from 'react-router';

class LoadMyIncident extends Component {

    constructor(props) {
        super(props);
        this.state = {openDilog:false,singleRequest:{}}
    }

    componentDidMount() {
        this.props.loadUserRequest();
        this.props.loadMyIncidentsRequest(this.props.application.user);
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5)
    }

handleOpenDilog = () => {
    this.setState({openDilog: true});
  };

  handleCloseDilog = () => {
    this.setState({openDilog: false});
  };

    handleRequiredRequest(event) {
        this.setState({"singleRequest":event});
        this.handleOpenDilog();
    }

    render() {
        const style = {
            minheight: 100,
            width: 900,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };
        const customAnchor = {
            textDecoration: 'none',
            color: '#000'
        };
        
        const actions = [
            <mat.FlatButton
                label="Close"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCloseDilog}
            />,
            ];
        const application = this.props && this.props.application && this.props.application.allCrimes ? this.props.application.allCrimes : [];
        return (
            <div>
            <mat.Dialog
                title="Inident Details"
                actions={actions}
                modal={false}
                open={this.state.openDilog}
                onRequestClose={this.handleCloseDilog}
                >
                <mat.Table
                adjustForCheckbox={false}
                displayRowCheckbox={false}>
                <mat.TableBody displayRowCheckbox={false}>
                    <mat.TableRow>
                        <mat.TableRowColumn>Affected Person Name</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.affectedName}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>Affected Person Gender</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.gender}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>Incident Date and Time</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.incidentTime}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>Reported By</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.userEmail}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>Incident Type</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.inicidentType}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>City</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.cityname}</mat.TableRowColumn>
                    </mat.TableRow>
                    <mat.TableRow>
                        <mat.TableRowColumn>Admin Responses</mat.TableRowColumn>
                        <mat.TableRowColumn>{this.state.singleRequest.comments && this.state.singleRequest.comments.length>0?this.state.singleRequest.comments.map((data,index)=>{
                                return <div key={index}>{data.key}<br /><br /></div>
                            })
                            :"Sorry Admin Has not Replied Yet."}</mat.TableRowColumn>
                    </mat.TableRow>
                </mat.TableBody>
                </mat.Table>
            </mat.Dialog>
            <mat.Paper zDepth={3} className="report-table">
                {application && application.length > 0 ?
                            <mat.Table
                                adjustForCheckbox={false}
                                displayRowCheckbox={false}>
                                <mat.TableHeader
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}>
                                    <mat.TableRow>

                                        <mat.TableHeaderColumn>Number</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Picture</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Name</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Gender</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Incident</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Time</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn></mat.TableHeaderColumn>
                                    </mat.TableRow>
                                </mat.TableHeader>
                                <mat.TableBody displayRowCheckbox={false}>
                                    {application.map((todo, index) => {
                                            return (
                                                <mat.TableRow key={index} selectable={false}>
                                                    <mat.TableRowColumn>{index + 1}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn><mat.Avatar
                                                        src={todo.gender == 'Male' ? "http://www.cablesyequipos.net/images/avatar.png" : "http://graphicalx.com/img/female-avatar.jpg"}
                                                        size={30}
                                                        /></mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.affectedName}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn>{todo.gender}</mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.inicidentType==1?"Crime":"Incident"}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn><Moment format="MM/DD/YYYY HH:mm">{todo.incidentTime}</Moment></mat.TableHeaderColumn>
                                                    <mat.TableHeaderColumn><mat.RaisedButton type="button" label="Request" primary={true} onClick={() => this.handleRequiredRequest(todo)} /></mat.TableHeaderColumn>
                                                </mat.TableRow>
                                            );
                                    })}
                                </mat.TableBody>
                            </mat.Table>
                            : null}
                </mat.Paper>
            </div>
        );
    }
}

export default LoadMyIncident;