import React, { Component } from 'react';
import * as mat from 'material-ui';
import './logo.css';

import {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} from 'react-router';
class AddSale extends Component {

    constructor(props) {
        super(props);
        this.state = {  salesDate: new Date(),value:"",productName:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

   componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5)
    }

    componentDidMount() {
        this.props.loadUserRequest();
        setTimeout(() => {
            this.props.loadstoresRequest(this.props.application.user.email);
            this.props.loadProductsRequest(this.props.application.user)
        }, 10)
    }

    handleChange = (event, index, value) => this.setState({value});
    handleProductChange = (event, index, value) => this.setState({productName:value});

    handleSubmit(evt) {
        evt.preventDefault();
        var storeName = this.refs.storeName.getValue();
        var storeDescription = this.refs.storeDescription.getValue();
        var objectToSave = {
            uid : this.props.application.user.uid,
            userEmail : this.props.application.user.email,
            storeName : storeName,
            storeDescription : storeDescription
        }
        this.props.addSalesRequest(objectToSave);
    }

handleDateChange = (event, date) => {
    this.setState({
      salesDate: date,
    });
    console.log(date);
  };


    render() {
        const application = this.props && this.props.application && this.props.application.allStores ? this.props.application.allStores : [];
        const allProducts = this.props && this.props.application && this.props.application.allProducts ? this.props.application.allProducts : [];
        
        return (
            <div className="main-login-div">
                <mat.Card>
                    <mat.CardTitle title="Add New Store" />
                    <mat.CardText>
                        <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                            <h3>Sales Info</h3>
                            <mat.Divider />
                            <mat.DatePicker
                                ref="salesDate"
                                hintText="Sales Date"
                                className="full-width-container"
                                floatingLabelText="Sales Date"
                                value={this.state.salesDate}
                                onChange={this.handleDateChange}
                            />
                            <mat.SelectField
                                floatingLabelText="Frequency"
                                value={this.state.productName}
                                onChange={this.handleProductChange}
                                className="full-width-container"
                                >
                                {allProducts && allProducts.length>0?
                                    allProducts.map((data,index)=>{
                                        return <mat.MenuItem key={index} value={data} primaryText={data.productName} />
                                    })
                                    :""}
                            </mat.SelectField>
                            <br/>
                            <mat.TextField
                                hintText="Product Quantity"
                                floatingLabelText="Product Quantity"
                                className="full-width-container"
                                ref="quantity"
                                name="quantity"
                                required={true}
                                type="number"
                                onChange={this.handleInputChange}
                                /><br />
                            <mat.TextField
                                hintText="Product Price"
                                floatingLabelText="Product Price"
                                className="full-width-container"
                                ref="price"
                                name="price"
                                required={true}
                                type="text"
                                onChange={this.handleInputChange}
                                /><br /> 
                            <mat.SelectField
                                floatingLabelText="Frequency"
                                value={this.state.value}
                                onChange={this.handleChange}
                                className="full-width-container"
                                >
                                {application && application.length>0?
                                    application.map((data,index)=>{
                                        return <mat.MenuItem key={index} value={data} primaryText={data.storeName} />
                                    })
                                    :""}
                            </mat.SelectField>
                            <br/>
                            {/*<mat.TextField
                                hintText="Store Name"
                                floatingLabelText="Store Name"
                                className="full-width-container"
                                ref="storeName"
                                name="storeName"
                                required={true}
                                type="text"
                                onChange={this.handleInputChange}
                                /><br />
                            <mat.TextField
                                hintText="Store Description"
                                floatingLabelText="Store Description"
                                multiLine={true}
                                className="full-width-container"
                                rows={3}
                                rowsMax={3}
                                ref="storeDescription"
                                name="storeDescription"
                                required={true}
                                type="text"
                                onChange={this.handleInputChange}
                                /><br />*/}
                            <mat.RaisedButton type="submit" label="Submit" primary={true} />
                        </form>
                    </mat.CardText>
                </mat.Card>
            </div>
        );
    }
}

export default AddSale;