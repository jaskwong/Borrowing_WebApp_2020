import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import * as url from "url";

const baseurl = 'http://localhost:9000';

export default class CreateGroupForm extends Component {

    state = {groupname: "", apiResponse: "", groupid: 0};


    changeCreateGroupName = event => {
        this.setState({groupname: event.target.value});
    }

    submitCreateGroupForm = event => {
        event.preventDefault();

        const groupname = {groupname: this.state.groupname}

        axios.post(url.resolve(baseurl, '/testcreategroup/creategroup'), groupname)
            .then(res => {
                this.setState({apiResponse: 'New group created!'})
            })
    }

    render() {
        return (
            <div className="CreateGroupForm">
                <h1>Add Group</h1>
                <form onSubmit={this.submitCreateGroupForm}>
                    <label for={"groupname"}>Group name: </label>
                    <input type={"text"} id={"groupname"} name={"groupname"} onChange={this.changeCreateGroupName}/>
                    <input type={"submit"} value={"Submit"}/>
                </form>
                <p>{this.state.apiResponse}</p>
            </div>)
    }
}