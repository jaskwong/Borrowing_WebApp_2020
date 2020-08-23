import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:9000/testcreategroup")
        .then(res => res.text())
        .then(res => this.setState({apiResponse:res}));
  }

  componentWillMount() {
    this.callAPI();
  }


  render () {return (
    <div className="App">
    <header className="App-header">
      <form action="/scripts/submitform.js">
        <label for={"GroupID"}>Group ID:</label>
        <input type={"text"} id={"GroupID"} name={"GroupID"} value={""}/>
        <label htmlFor={"GroupName"}>Group Name:</label>
        <input type={"text"} id={"GroupName"} name={"GroupName"} value={""}/>
        <input type={"submit"} value={"Submit"}/>
      </form>
      <p className={"App-intro"}>{this.state.apiResponse}</p>
    </header>
  </div>)};
}

