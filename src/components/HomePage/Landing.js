import React from "react";
import EntryForm from "./EntryForm";
import axios from "axios";
import SleepEntryList from "./SleepEntryList";
import SleepEntry from './SleepEntry';
import { Route } from 'react-router-dom';

const URL = "https://sleeper-app.herokuapp.com";

export class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
        showPopup: false,
        sleepstats:[],
        active:[]
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    axios
      .get(`${URL}/api/sleep`, headers)
      .then(res => {
        this.setState({ sleepstats: res.data });
      })
      .catch(err => console.log("123", err));
  }

  addEntry = dogBanana => {
    axios
        .post(`${URL}`, dogBanana)
        .then(res => {
            this.setState({ sleepstats: res.data });
        })
        .catch(err => console.log('456', err))
  }

  deleteEntry = id => {
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    axios
        .delete(`${URL}/api/sleep/${id}`, headers)
        .then(res => {
            this.setState({ sleepstats: res.data })
        })
        .catch(err => console.log('789', err))
  }

  togglePopup() {
      this.setState({
          showPopup:!this.state.showPopup
      })
  }

  setActive = id => {
    console.log(this.state.sleepstats)
    const saved = this.state.sleepstats.find(stat => {
      console.log(stat.id)
      return stat.id == id})
    this.setState({
      active: saved
    },
    this.props.history.push(`/sleep/${id}`)
    // console.log(this.state.active)
    )
  }

  render() {
    return (
      <div>
        <h2>Your Week in Review</h2>
        <button onClick={this.togglePopup.bind(this)}>Log a new sleep entry</button>
        {this.state.showPopup ?
            <EntryForm 
                addEntry={this.addEntry} 
                closePopup={this.togglePopup.bind(this)} 
                /> 
                : null
        }
        <div>
          <Route to="/sleep/:id" render={props =>
              <SleepEntry sleepstat={this.state.active}/>} />
            <SleepEntryList sleepstats={this.state.sleepstats} deleteEntry={this.deleteEntry} setActive={this.setActive}/>
        </div>
      </div>
    );
  }
}

export default Landing;
