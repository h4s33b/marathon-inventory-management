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
class AddStore extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

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
        this.props.addStoreRequest(objectToSave);
    }


    render() {
        return (
            <div className="main-login-div">
                <mat.Card>
                    <mat.CardTitle title="Add New Store" />
                    <mat.CardText>
                        <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                            <h3>Store Info</h3>
                            <mat.Divider />
                            <mat.TextField
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
                                /><br />
                            <mat.RaisedButton type="submit" label="Submit" primary={true} />
                        </form>
                    </mat.CardText>
                </mat.Card>
            </div>
        );
    }
}

export default AddStore;