import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from '../logo.svg';
import '../Views/App/App.css';
import axios from 'axios'
import url from "url";

const baseurl = 'http://localhost:9000';

export default class CreateUser extends Component {

    render() {
        return (
            <div className="CreateUser">
                <h1>Create User</h1>
            </div>)
    }
}