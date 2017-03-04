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

class ViewAllCrimes extends Component {
    constructor(props){
        super(props);
        this.state = {showLogin : true,requiredIncidentType: 5,openDilog:false,singleRequest:{},requiredCity:"All"};
        this.requiredIncidents = [
            1,
            2,
            3,
            4,
            5
        ]
        this.handleSubmit = this.handleSubmit.bind(this);
        this.citiesGroup = [
            "All",
            "Huntsville",
            "Anchorage",
            "Phoenix",
            "Little-Rock",
            "Sacramento",
            "Los-Angeles",
            "Beverly-Hills",
            "Denver",
            "Hartford",
            "Washington"
        ]
    }

  handleOpenDilog = () => {
    this.setState({openDilog: true});
  };

  handleCloseDilog = () => {
    this.setState({openDilog: false});
  };

    componentDidMount() {
        this.props.loadUserRequest();
        this.props.loadAllCrimesRequest();
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }else if(this.props.application && this.props.application.user && !this.props.application.user.isAdmin){
                alert("You are not Allowed to go to this page.");
                browserHistory.push('/dashboard');
            }
        }, 5)
    }

    testtype(currentType,cityName) {
        if(this.state.requiredCity=="All"){
            if(this.state.requiredIncidentType==5){
                return true;
            }else if (this.state.requiredIncidentType == currentType) {
                return true;
            }else{
                false;
            }
        }else if(this.state.requiredCity == cityName){
            if(this.state.requiredIncidentType==5){
                return true;
            }else if (this.state.requiredIncidentType == currentType) {
                return true;
            }else{
                false;
            }
        }
    }

    handleSubmit(evt){
        evt.preventDefault();
        console.log(evt.target.address.value);
        var dataToSave = {"comment":evt.target.address.value,objectKey:this.state.singleRequest.key};
        this.props.updateReport(dataToSave);
        console.log(this.refs.address.getValue());
    }

    handleRequiredRequest(event) {
        this.setState({"singleRequest":event});
        this.handleOpenDilog();
    }

    
handleRequiredTypeChange = (event, index, value) => { this.setState({ requiredIncidentType: value }); console.log(value) };
handleRequiredCityChange = (event, index, value) => { this.setState({ requiredCity: value }); console.log(value) };
    render() {
        const that = this;
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
        }
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
                <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                    <mat.TextField
                                hintText="MultiLine with rows: 2 and rowsMax: 4"
                                multiLine={true}
                                className="full-width-container"
                                rows={3}
                                rowsMax={3}
                                ref="address"
                                name="address"
                                required={true}
                                type="text"
                                onChange={this.handleInputChange}
                                /><br />
                     <mat.RaisedButton type="submit" label="Submit" primary={true} />
                </form>
            </mat.Dialog>
            <mat.Paper zDepth={3} className="report-table">
                <div className="blood-type">
                            <mat.SelectField
                                ref="requiredIncidentType"
                                name="requiredIncidentType"
                                floatingLabelText="Filter By"
                                onChange={this.handleRequiredTypeChange}
                                className="full-width-container"
                                value={this.state.requiredIncidentType}
                                required={true}
                                >
                                {
                                    this.requiredIncidents.map(requiredIncident => {
                                        return <mat.MenuItem key={requiredIncident} value={requiredIncident} primaryText={requiredIncident==1?"Crime":requiredIncident==2?"Missing":requiredIncident==3?"Complain":requiredIncident==4?"Other":"All"} />
                                    })
                                }
                            </mat.SelectField>
                            <br />
                            <mat.SelectField
                                ref="requiredCity"
                                name="requiredCity"
                                floatingLabelText="Filter By City"
                                onChange={this.handleRequiredCityChange}
                                className="full-width-container"
                                value={this.state.requiredCity}
                                required={true}
                                >
                                {
                                    this.citiesGroup.map(requiredIncident => {
                                        return <mat.MenuItem key={requiredIncident} value={requiredIncident} primaryText={requiredIncident} />
                                    })
                                }
                            </mat.SelectField>
                        </div>

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
                                        <mat.TableHeaderColumn>City</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Time</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn></mat.TableHeaderColumn>
                                    </mat.TableRow>
                                </mat.TableHeader>
                                <mat.TableBody displayRowCheckbox={false}>
                                    {application.map((todo, index) => {
                                        if (that.testtype(todo.inicidentType,todo.cityname)) {
                                            return (
                                                <mat.TableRow key={index} selectable={false}>
                                                    <mat.TableRowColumn>{index + 1}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn><mat.Avatar
                                                        src={todo.gender == 'Male' ? "http://www.cablesyequipos.net/images/avatar.png" : "http://graphicalx.com/img/female-avatar.jpg"}
                                                        size={30}
                                                        /></mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.affectedName}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn>{todo.gender}</mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.inicidentType==1?"Crime":todo.inicidentType==2?"Missing":todo.inicidentType==4?"Other":"Complain"}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn>{todo.cityname}</mat.TableHeaderColumn>
                                                    <mat.TableHeaderColumn><Moment format="MM/DD/YYYY HH:mm">{todo.incidentTime}</Moment></mat.TableHeaderColumn>
                                                    <mat.TableHeaderColumn><mat.RaisedButton type="button" label="Request" primary={true} onClick={() => this.handleRequiredRequest(todo)} /></mat.TableHeaderColumn>
                                                </mat.TableRow>
                                            );
                                        }
                                    })}
                                </mat.TableBody>
                            </mat.Table>
                            : null}
                </mat.Paper>
            </div>
        );
    }
}

export default ViewAllCrimes;