import React from "react";
import EntryForm from "./EntryForm";
import axios from "axios";

const URL = "https://sleeper-app.herokuapp.com";

export class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
        showPopup: false,
        sleepstats:[]
    };
  }

  componentDidMount() {
    axios
      .get(`${URL}/sleep`)
      .then(res => {
        this.setState({ sleepstats: [...res.data] });
      })
      .catch(err => console.log("123", err));
  }

  addEntry = dogBanana => {
    axios
        .post(`${URL}`, dogBanana)
        .then(res => {
            this.setState({ "": res.data });
        })
        .catch(err => console.log('456', err))
  }

  deleteEntry = id => {
    axios
        .delete(`${URL}/${id}`)
        .then(res => {
            this.setState({"": res.data})
        })
        .catch(err => console.log('789', err))
  }

  togglePopup() {
      this.setState({
          showPopup:!this.state.showPopup
      })
  }

  render() {
    return (
      <div>
        <h2>Hey Sleepyheads</h2>
        <button onClick={this.togglePopup.bind(this)}>Log a new sleep entry</button>
        {this.state.showPopup ?
            <EntryForm 
                addEntry={this.addEntry} 
                closePopup={this.togglePopup.bind(this)} 
                /> 
                : null
        }
      </div>
    );
  }
}

export default Landing;
