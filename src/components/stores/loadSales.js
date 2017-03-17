import React, { Component } from 'react';
import regression from 'regression';
import * as mat from 'material-ui';
import Moment from 'react-moment';
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts';

import './logo.css';
import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} from 'react-router';

class LoadSales extends Component {
    constructor(props) {
        super(props);
        var date = new Date();
        var oldDate = new Date();
        oldDate.setHours("23");
        oldDate.setMinutes("59");
        date.setDate(date.getDate() - 7);
        this.state = { openDilog: false, singleRequest: {}, timeDelay: date, timeDelayEnd: oldDate };
        this.requiredAvaialble = [
            "All",
            "Availabile"
        ]
        this.graphData = [];
        this.graphNextValues = [];
        this.graphOriginalValues = [];

        //     this.data = [
        //       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        //       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        //       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        //       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        //       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        //       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        //       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        // ];
    }

    componentDidMount() {
        this.props.loadUserRequest();
        this.props.loadSalesRequest(this.props.application.user);
    }

    componentWillReceiveProps() {
        var that = this;
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5
        );
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }

            if (this.props.application.allSales && this.props.application.allSales.length > 0) {
                this.graphData = [];
                this.props.application.allSales.forEach((data, index) => {
                    var innerData = [];
                    innerData.push(index + 1);
                    innerData.push(data.totalAmount);
                    this.graphData.push(innerData)
                })
                var result = regression('linearThroughOrigin', this.graphData);
                var slope = result.equation[0];
                var yIntercept = result.equation[1];
                

                this.graphOriginalValues = [];
                this.graphData.forEach((innetrDataAgain, index) => {
                    that.graphOriginalValues.push({ name: index+1, "uv": innetrDataAgain[1] })
                })


                this.graphNextValues = [];
                this.graphData.forEach((innetrDataAgain, index) => {
                    that.graphNextValues.push({ name: index+1, "uv": (slope * (index + 1)) })
                })
                var totalLength = that.graphNextValues.length;
                for (var k = 0; k < 3; k++) {
                    that.graphNextValues.push({ name: (totalLength + k+1), "uv": (slope * (totalLength + k+1)) })
                }
            }
        }, 150)
    }

    handleRequiredTypeChange = (event, index, value) => { this.setState({ availabilityRequired: value }); console.log(value) };

    testtype(availability) {
        if (availability >= this.state.timeDelay.getTime() && this.state.timeDelayEnd.getTime() >= availability) {
            return true;
        } else {
            return false;
        }
    }

    handleDateChange = (event, date) => {
        this.setState({
            timeDelay: date,
        });
        console.log(date);
    };

    handleDateEndChange = (event, date) => {
        date.setHours("23");
        date.setMinutes("59");
        this.setState({
            timeDelayEnd: date,
        });
        console.log(date);
    };


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
        const application = this.props && this.props.application && this.props.application.allSales ? this.props.application.allSales : [];
        var that = this;
        return (
            <div>
                <div className="blood-type">
                    <mat.DatePicker
                        ref="salesDate"
                        hintText="Start Date"
                        className="full-width-container"
                        floatingLabelText="Start Date"
                        value={this.state.timeDelay}
                        onChange={this.handleDateChange}
                        />
                    <mat.DatePicker
                        ref="endDate"
                        hintText="End Date"
                        className="full-width-container"
                        floatingLabelText="End Date"
                        value={this.state.timeDelayEnd}
                        onChange={this.handleDateEndChange}
                        />
                    {/*<mat.SelectField
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
                    </mat.SelectField>*/}
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
                        <div>{that.graphOriginalValues && that.graphOriginalValues.length?"Original Chart":""}                            <LineChart width={400} height={400} data={that.graphOriginalValues}>
                                <CartesianGrid stroke="#ccc" />
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <XAxis dataKey="name" />
                            </LineChart>
                            {that.graphOriginalValues && that.graphOriginalValues.length?"Regression Based":""} 
                            <LineChart width={400} height={400} data={that.graphNextValues}>
                                <CartesianGrid stroke="#ccc" />
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <XAxis dataKey="name" />
                            </LineChart>
                            <mat.Table
                                adjustForCheckbox={false}
                                displayRowCheckbox={false}>
                                <mat.TableHeader
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}>
                                    <mat.TableRow>

                                        <mat.TableHeaderColumn>Number</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Date</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Store Name</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Product Name</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Quantity</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Price Sold</mat.TableHeaderColumn>
                                        <mat.TableHeaderColumn>Total Ammount</mat.TableHeaderColumn>
                                    </mat.TableRow>
                                </mat.TableHeader>
                                <mat.TableBody displayRowCheckbox={false}>
                                    {application.map((todo, index) => {
                                        if (that.testtype(todo.salesDate)) {
                                            return (
                                                <mat.TableRow key={index} selectable={false}>
                                                    <mat.TableRowColumn>{index + 1}</mat.TableRowColumn>
                                                    <mat.TableRowColumn><Moment format="MM/DD/YYYY HH:mm">{todo.salesDate}</Moment></mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.store.storeName}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.product.productName}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.quantity}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.price}</mat.TableRowColumn>
                                                    <mat.TableRowColumn>{todo.totalAmount}</mat.TableRowColumn>
                                                </mat.TableRow>
                                            );
                                        }
                                    })}
                                </mat.TableBody>
                            </mat.Table>
                        </div>
                        : null}
                </mat.Paper>
            </div>
        );
    }
}

export default LoadSales;