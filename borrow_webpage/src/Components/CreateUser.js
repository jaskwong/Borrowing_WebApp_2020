import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from '../logo.svg';
import '../Views/App/App.css';
import axios from 'axios'
import url from "url";

const baseurl = 'http://localhost:9000';

export default class CreateUser extends Component {

    state = {userID: ""};


    changeUserID = event => {
        this.setState({userID: event.target.value});
    }

    submitCreateUserform = event => {
        event.preventDefault();

        let params = new URLSearchParams(document.location.search.substring(1));
        let groupid = params.get("groupid")
        console.log(groupid);
        const data = {userID: this.state.userID, groupID: groupid}
        return axios.post(url.resolve(baseurl, '/users/createuser'), data).then(res => {
            this.state = this.state;
            document.getElementById("response").innerHTML = "User successfully created";
        })


    }

    render() {
        return (
            <div className="CreateUser">
                <h1>Create User</h1>
                <form onSubmit={this.submitCreateUserform}>
                    <label htmlFor={"userID"}>Username: </label>
                    <input type={"text"} id={"userID"} name={"userID"} onChange={this.changeUserID}/>
                    <input type={"submit"} value={"Submit"}/>
                </form>
                <p id="response"></p>
            </div>)
    }
}