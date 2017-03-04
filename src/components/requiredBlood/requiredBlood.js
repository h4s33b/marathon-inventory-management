import React, { Component } from 'react';
import * as mat from 'material-ui';
import './requiredBlood.css';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    Link,
    IndexLink
} from 'react-router';

class RequiredBlood extends Component {

    constructor(props) {
        super(props);
        this.bloodgroups = [
            "A+",
            "B+",
            "AB+",
            "O+",
            "A-",
            "B-",
            "AB-",
            "O-"
        ]
        this.allDonors = [];
        this.state = { open: false, applications: '', requiredBlood: 'AB+' };
        this.handleRequiredTypeChange = this.handleRequiredTypeChange.bind(this);
        this.testBlood = this.testBlood.bind(this);
        this.handleRequiredRequest = this.handleRequiredRequest.bind(this);
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5)
    }

    handleRequiredTypeChange = (event, index, value) => { this.setState({ requiredBlood: value }); console.log(value) };
    componentDidMount() {
        this.props.loadUserRequest();
        //This is called for Loading Initial State
        this.props.requiredBloodRequest();
    }

    handleRequiredRequest(event) {
        this.props.updateBloodRequest(event);
        //Continue from here at home
        // console.log(event.target.value);
    }

    testBlood(currentBlood) {
        if (this.state.requiredBlood == 'A+') {
            if (currentBlood == 'O-' || currentBlood == 'O+' || currentBlood == 'A-' || currentBlood == 'A+') {
                return true;
            }
        } if (this.state.requiredBlood == 'B+') {
            if (currentBlood == 'O-' || currentBlood == 'O+' || currentBlood == 'B-' || currentBlood == 'B+') {
                return true;
            }
        } if (this.state.requiredBlood == 'AB+') {
            return true;
        } if (this.state.requiredBlood == 'O+') {
            if (currentBlood == 'O-' || currentBlood == 'O+') {
                return true;
            }
        } if (this.state.requiredBlood == 'A-') {
            if (currentBlood == 'O-' || currentBlood == 'A-') {
                return true;
            }
        } if (this.state.requiredBlood == 'B-') {
            if (currentBlood == 'O-' || currentBlood == 'B-') {
                return true;
            }
        } if (this.state.requiredBlood == 'AB-') {
            if (currentBlood == 'O-' || currentBlood == 'B-' || currentBlood == 'A-' | currentBlood == 'A+') {
                return true;
            }
        } if (this.state.requiredBlood == 'A+') {
            if (currentBlood == 'O-' || currentBlood == 'O+' || currentBlood == 'A-' || currentBlood == 'A+') {
                return true;
            }
        } if (this.state.requiredBlood == 'O-') {
            if (currentBlood == 'O-') {
                return true;
            }
        }
    }

    render() {
        const style = {
            height: 100,
            width: 500,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };
        const that = this;
        const application = this.props && this.props.application && this.props.application.allBloods ? this.props.application.allBloods : [];
        return (
            <div>
                <div>
                    <mat.Paper className="table-main" zDepth={3} >
                        <div className="blood-type">
                            <mat.SelectField
                                ref="requiredBlood"
                                name="requiredBlood"
                                floatingLabelText="Required Blood Type"
                                onChange={this.handleRequiredTypeChange}
                                className="full-width-container"
                                value={this.state.requiredBlood}
                                required={true}
                                >
                                {
                                    this.bloodgroups.map(bloodgroup => {
                                        return <mat.MenuItem key={bloodgroup} value={bloodgroup} primaryText={bloodgroup} />
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
                                        <mat.TableHeaderColumn>Blood Type</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn></mat.TableHeaderColumn>
                                    </mat.TableRow>
                                </mat.TableHeader>
                                <mat.TableBody displayRowCheckbox={false}>
                                    {application.map((todo, index) => {
                                        if (that.testBlood(todo.bloodType)) {
                                            return (
                                                <mat.TableRow key={index} selectable={false}>
                                                    <mat.TableRowColumn>{index + 1}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn><mat.Avatar
                                                        src={todo.gender == 'Male' ? "http://www.cablesyequipos.net/images/avatar.png" : "http://graphicalx.com/img/female-avatar.jpg"}
                                                        size={30}
                                                        /></mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.name}</mat.TableRowColumn>
                                                    <mat.TableHeaderColumn>{todo.gender}</mat.TableHeaderColumn>
                                                    <mat.TableRowColumn>{todo.bloodType}</mat.TableRowColumn>
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
            </div>
        );
    }
}

export default RequiredBlood;