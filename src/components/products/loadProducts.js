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

class LoadProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {openDilog:false,singleRequest:{},availabilityRequired:"All"};
        this.requiredAvaialble = [
            "All",
            "Availabile"
        ]
    }

    componentDidMount() {
        this.props.loadUserRequest();
        this.props.loadProductsRequest(this.props.application.user);
    }

    componentWillReceiveProps() {
        var that = this;
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
            console.log(that.props.application.allSales);
        }, 5)
    }

handleRequiredTypeChange = (event, index, value) => { this.setState({ availabilityRequired: value }); console.log(value) };

    testtype(availability,quantity) {
        if(this.state.availabilityRequired=="All"){
            return true;
        }else if(availability && quantity>0){
            return true;
        }else{
            return false;
        }
    }

    handleRequiredRequest(event) {
        browserHistory.push('/addProduct');
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
        const application = this.props && this.props.application && this.props.application.allProducts ? this.props.application.allProducts : [];
        var that = this;
        return (
            <div>
            <div className="blood-type">
                            <mat.SelectField
                                ref="requiredCity"
                                name="requiredCity"
                                floatingLabelText="Filter By Avaialbility"
                                onChange={this.handleRequiredTypeChange}
                                className="full-width-container"
                                value={this.state.availabilityRequired}
                                required={true}
                                >
                                {
                                    this.requiredAvaialble.map(requiredIncident => {
                                        return <mat.MenuItem key={requiredIncident} value={requiredIncident} primaryText={requiredIncident} />
                                    })
                                }
                            </mat.SelectField>
                        </div>
            {/*<mat.Dialog
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
</mat.Dialog>*/}
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
                                        <mat.TableHeaderColumn>Product Name</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Product Manufacturer</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Availability</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Availabile Quantity</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn></mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn></mat.TableHeaderColumn>
                                    </mat.TableRow>
                                </mat.TableHeader>
                                <mat.TableBody displayRowCheckbox={false}>
                                    {application.map((todo, index) => {
                                        if (that.testtype(todo.availability,todo.quantity)) {
                                            return (
                                                <mat.TableRow key={index} selectable={false}>
                                                    <mat.TableRowColumn>{index + 1}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.productName}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.manufacturer}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.availability?"True":"Out Of Stock"}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.quantity}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>
                                                   {
                                                       <Link
                                                        to={"/updateProduct/"+todo.key}
                                                        className="btn btn-primary">
                                                        Update
                                                    </Link>}
                                                    {/*<mat.RaisedButton type="button" label="Request" primary={true} onClick={() => this.handleRequiredRequest(todo)} />*/}
                                                    </mat.TableRowColumn>
                                                    <mat.TableRowColumn></mat.TableRowColumn>
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

export default LoadProducts;