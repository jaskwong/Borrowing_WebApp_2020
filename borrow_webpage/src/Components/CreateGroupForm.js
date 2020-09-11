import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from '../logo.svg';
import '../Views/App/App.css';
import axios from 'axios'
import * as url from "url";

const baseurl = 'http://localhost:9000';

export default class CreateGroupForm extends Component {

    state = {groupname: "", groupid: null, groupnamefinal: ""};


    changeCreateGroupName = event => {
        this.setState({groupname: event.target.value});
    }

    submitCreateGroupForm = event => {
        event.preventDefault();

        const groupname = {groupname: this.state.groupname}

        axios.post(url.resolve(baseurl, '/groups/creategroup'), groupname)
            .then(res => {
                this.setState({groupnamefinal: res.data.groupname})
                this.setState({groupid: res.data.groupid})
                document.getElementById("response").innerHTML = "Your group " + this.state.groupnamefinal + " was created with groupID "
                + this.state.groupid;
                let redirect = new URL('http://localhost:3000/users/createuser')
                let params = redirect.searchParams;
                params.append('groupid', res.data.groupid);
                redirect.search = params.toString();
                console.log(redirect.toString());
                window.location = redirect.toString();
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
                <p id="response"></p>
            </div>)
    }
}