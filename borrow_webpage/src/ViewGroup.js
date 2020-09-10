import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

export default class ViewGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {groupid: "", apiResponse: ""};
  }

  componentWillMount() {
    //startup page information
  }

  changeViewGroup = event => {
    this.setState({groupid: event.target.value});
  }

  submitViewGroup = event => {
    event.preventDefault();

    const groupid = this.state.groupid

    axios.get("http://localhost:9000/groups/viewgroup", { params:{groupid: groupid} })
        .then(res => this.setState({apiResponse:JSON.stringify(res.data)}))
  }


  render () {return (
    <div className="App">
    <header className="App-header">
      <form onSubmit={this.submitViewGroup}>
        <label for={"GroupID"}>Group ID:</label>
        <input type={"text"} id={"GroupID"} name={"GroupID"} onChange={this.changeViewGroup}/>
        <input type={"submit"} value={"Submit"}/>
      </form>
      <p className={"ViewGroup-intro"}>{this.state.apiResponse}</p>
    </header>
  </div>)};
}

