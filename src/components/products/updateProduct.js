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
class UpdateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {"productName":"","manufacturer":"","description":"","quantity":"","price":""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.projectToUpdate = this.projectToUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        this.props.loadUserRequest();
        this.props.loadProductsRequest(this.props.application.user);
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.application || !this.props.application.user) {
                browserHistory.push('/login');
            }
        }, 5)
    }

    handleSubmit(evt) {
        evt.preventDefault();
        var productName = this.refs.productName.getValue();
        var manufacturer = this.refs.manufacturer.getValue();
        var description = this.refs.description.getValue();
        var quantity = this.refs.quantity.getValue();
        var price = this.refs.price.getValue();
        var objectToSave = {
            uid: this.props.application.user.uid,
            userEmail: this.props.application.user.email,
            productName: productName,
            manufacturer: manufacturer,
            description: description,
            quantity: quantity,
            price: price,
            availability: true,
            productId : this.props.location.pathname.split("/")[2]
        }
        console.log("objectToSave",objectToSave);
        this.props.updateProductRequest(objectToSave);
    }

    projectToUpdate(data) {
        var that = this;
        var dataToReturn = [];
        if (data.length) {
            data.forEach((innerData) => {
                if (innerData.key == that.props.location.pathname.split("/")[2]) {
                    dataToReturn.push(innerData);
                }
            })
        } else {
            return dataToReturn;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render() {
        var that = this;
        const application = this.props && this.props.application && this.props.application.allProducts ? this.props.application.allProducts : [];
        return (
            <div className="main-login-div">
                {application && application.length > 0 ?
                    application.map((date, index) => {
                        if (date.key == that.props.location.pathname.split("/")[2]) {
                            return <mat.Card key={index}>
                                <mat.CardTitle title="Update New Product" />
                                <mat.CardText>
                                    <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                                        <h3>Product Info</h3>
                                        <mat.Divider />
                                        <mat.TextField
                                            hintText="Test Product"
                                            floatingLabelText="Product Name"
                                            className="full-width-container"
                                            ref="productName"
                                            name="productName"
                                            value={ this.state.productName?this.state.productName:date.productName}
                                            required={true}
                                            type="text"
                                            onChange={this.handleInputChange}
                                            /><br />
                                        <mat.TextField
                                            hintText="Product Manufacturer"
                                            floatingLabelText="Product Manufacturer"
                                            className="full-width-container"
                                            ref="manufacturer"
                                            name="manufacturer"
                                            value={this.state.manufacturer?this.state.manufacturer:date.manufacturer}
                                            required={true}
                                            type="text"
                                            onChange={this.handleInputChange}
                                            /><br />
                                        <mat.TextField
                                            hintText="Product Description"
                                            floatingLabelText="Product Description"
                                            multiLine={true}
                                            className="full-width-container"
                                            rows={3}
                                            rowsMax={3}
                                            value={ this.state.description?this.state.description:date.description}
                                            ref="description"
                                            name="description"
                                            required={true}
                                            type="text"
                                            onChange={this.handleInputChange}
                                            /><br />
                                        <mat.TextField
                                            hintText="Product Quantity"
                                            floatingLabelText="Product Quantity"
                                            className="full-width-container"
                                            ref="quantity"
                                            name="quantity"
                                            value={ this.state.quantity?this.state.quantity:date.quantity}
                                            value={date.quantity}
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
                                            value={ this.state.price?this.state.price:date.price}
                                            required={true}
                                            type="text"
                                            onChange={this.handleInputChange}
                                            /><br />
                                        <mat.RaisedButton type="submit" label="Submit" primary={true} />
                                    </form>
                                </mat.CardText>
                            </mat.Card>
                        }
                    })

                    : ""}
            </div>
        );
    }
}

export default UpdateProduct;