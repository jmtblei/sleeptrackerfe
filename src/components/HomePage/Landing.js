import React from "react";
import EntryForm from "./EntryForm";
import axios from "axios";
import SleepEntryList from "./SleepEntryList";
import { Route, Switch } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import UpdateSleepEntry from './UpdateSleepEntry';

const URL = "https://sleeptrackerredeploy.herokuapp.com/";

export class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
        showPopup: false,
        sleepstats:[],
        active:[],
        last7Days:[],
        day0: {},
        day1: {},
        day2: {},
        day3: {},
        day4: {},
        day5: {},
        day6: {},
        graphData: {}
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    await this.last7Days();
    await this.getGraphdata(this.state.last7Days)
    await this.inputGraphdata()
    axios
      .get(`${URL}/api/sleep`, headers)
      .then(res => {
        this.setState({ sleepstats: res.data });
      })
      .catch(err => console.log("Couldn't Load", err));
  }

  formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = yyyy+'-'+mm+'-'+dd;
    return date
  }

  last7Days = () => {
      let today = new Date();
      let oneDayAgo = new Date(today);
      let twoDaysAgo = new Date(today);
      let threeDaysAgo = new Date(today);
      let fourDaysAgo = new Date(today);
      let fiveDaysAgo = new Date(today);
      let sixDaysAgo = new Date(today);

      oneDayAgo.setDate(today.getDate() - 1);
      twoDaysAgo.setDate(today.getDate() - 2);
      threeDaysAgo.setDate(today.getDate() - 3);
      fourDaysAgo.setDate(today.getDate() - 4);
      fiveDaysAgo.setDate(today.getDate() - 5);
      sixDaysAgo.setDate(today.getDate() - 6);

      let result0 = this.formatDate(today);
      let result1 = this.formatDate(oneDayAgo);
      let result2 = this.formatDate(twoDaysAgo);
      let result3 = this.formatDate(threeDaysAgo);
      let result4 = this.formatDate(fourDaysAgo);
      let result5 = this.formatDate(fiveDaysAgo);
      let result6 = this.formatDate(sixDaysAgo);

      let result = [result0,result1,result2,result3,result4,result5,result6];
      this.setState({ last7Days: result });
  }

  getGraphdata = async dates => {
    const token = localStorage.getItem("userdata");
    const userid = localStorage.getItem("userid")
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
      await axios.get(`${URL}/api/sleep/${userid}/${dates[0]}`, headers)
      .then(res => {
        this.setState({ day0: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[1]}`, headers)
      .then(res => {
        this.setState({ day1: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[2]}`, headers)
      .then(res => {
        this.setState({ day2: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[3]}`, headers)
      .then(res => {
        this.setState({ day3: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[4]}`, headers)
      .then(res => {
        this.setState({ day4: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[5]}`, headers)
      .then(res => {
        this.setState({ day5: res.data })
      })
      .catch(err => console.log(err))
      await axios.get(`${URL}/api/sleep/${userid}/${dates[6]}`, headers)
      .then(res => {
        this.setState({ day6: res.data })
      })
      .catch(err => console.log(err))
  }

  inputGraphdata = () => {
    const data = {
      labels: [this.state.last7Days[6], this.state.last7Days[5], this.state.last7Days[4], this.state.last7Days[3], this.state.last7Days[2], this.state.last7Days[1], this.state.last7Days[0]],
      datasets: [
        {
          label: 'Hours slept per night',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [this.state.day6.timeSlept || null, this.state.day5.timeSlept || null, this.state.day4.timeSlept || null, this.state.day3.timeSlept || null, this.state.day2.timeSlept || null, this.state.day1.timeSlept || null, this.state.day0.timeSlept || null]
        }
      ]
    };
    this.setState({ graphData: data })
  }

  addEntry = async (event, entry) => {
    event.preventDefault();
    const newEntry = {...entry, user_id: localStorage.getItem("userid")};
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    await axios
        .post(`${URL}/api/sleep`, newEntry, headers)
        .then(res => {
            this.setState({ sleepstats: [newEntry, ...this.state.sleepstats] });
        })
        .catch(err => console.log("Couldn't Add", err))
      await this.getGraphdata(this.state.last7Days)
      await this.inputGraphdata()
  }

  deleteEntry = async id => {
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    await axios
        .delete(`${URL}/api/sleep/${id}`, headers)
        .then(res => {
            this.setState({ sleepstats: this.state.sleepstats.filter(sleepstat => sleepstat.id !== id) })
            alert('An entry has been deleted')
        })
        .catch(err => console.log("Couldn't Delete", err))
      await this.getGraphdata(this.state.last7Days)
      await this.inputGraphdata()
  }

  updateEntry = async (event, entry) => {
    event.preventDefault();
    const updateEntry = {...entry, user_id: localStorage.getItem("userid")};
    const token = localStorage.getItem("userdata");
    const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
    await axios
      .put(`${URL}/api/sleep/${entry.id}`, updateEntry, headers)
      .then(res => {
        this.setState({ sleepstats: [updateEntry, ...this.state.sleepstats]})
        alert('Your entry has been updated!')
      })
      .catch(err => console.log("Couldn't Update", err))
    await this.getGraphdata(this.state.last7Days)
    await this.inputGraphdata()
  }

  togglePopup() {
      this.setState({
          showPopup:!this.state.showPopup
      })
  }

  setActive = id => {
    const saved = this.state.sleepstats.find(stat => {
      return stat.id === id})
    this.setState({
      active: saved
    },
    this.props.history.push(`/home/sleep/${id}`)
    )
  }

  calculateWeekaverage = () => {
    const sleepScores = {}
    // if (Object.entries(this.state.day0).length !== 0) sleepScores[this.state.day0.timeSlept] = this.calculateMood(this.state.day0.wakeMood)
    // if (Object.entries(this.state.day1).length !== 0) {
    //   if (this.state.day1.timeSlept in sleepScores) {
    //     sleepScores[this.state.day1.timeSlept] += this.calculateMood(this.state.day1.wakeMood)
    //   } else {
    //     sleepScores[this.state.day1.timeSlept] = this.calculateMood(this.state.day1.wakeMood)
    //   }
    // }
    // if (Object.entries(this.state.day2).length !== 0) {
    //   if (this.state.day2.timeSlept in sleepScores) {
    //     sleepScores[this.state.day2.timeSlept] += this.calculateMood(this.state.day2.wakeMood)
    //   } else {
    //     sleepScores[this.state.day2.timeSlept] = this.calculateMood(this.state.day2.wakeMood)
    //   }
    // }
    // if (Object.entries(this.state.day3).length !== 0) {
    //   if (this.state.day3.timeSlept in sleepScores) {
    //     sleepScores[this.state.day3.timeSlept] += this.calculateMood(this.state.day3.wakeMood)
    //   } else {
    //     sleepScores[this.state.day3.timeSlept] = this.calculateMood(this.state.day3.wakeMood)
    //   }
    // }
    // if (Object.entries(this.state.day4).length !== 0) {
    //   if (this.state.day4.timeSlept in sleepScores) {
    //     sleepScores[this.state.day4.timeSlept] += this.calculateMood(this.state.day4.wakeMood)
    //   } else {
    //     sleepScores[this.state.day4.timeSlept] = this.calculateMood(this.state.day4.wakeMood)
    //   }
    // }
    // if (Object.entries(this.state.day5).length !== 0) {
    //   if (this.state.day5.timeSlept in sleepScores) {
    //     sleepScores[this.state.day5.timeSlept] += this.calculateMood(this.state.day5.wakeMood)
    //   } else {
    //     sleepScores[this.state.day5.timeSlept] = this.calculateMood(this.state.day5.wakeMood)
    //   }
    // }
    // if (Object.entries(this.state.day6).length !== 0) {
    //   if (this.state.day6.timeSlept in sleepScores) {
    //     sleepScores[this.state.day6.timeSlept] += this.calculateMood(this.state.day6.wakeMood)
    //   } else {
    //     sleepScores[this.state.day6.timeSlept] = this.calculateMood(this.state.day6.wakeMood)
    //   }
    // }
    if (this.state.day0) sleepScores[this.state.day0.timeSlept] = (this.state.day0.wakeMood)
    if (this.state.day1) {
      if (this.state.day1.timeSlept in sleepScores) {
        sleepScores[this.state.day1.timeSlept] += (this.state.day1.wakeMood)
      } else {
        sleepScores[this.state.day1.timeSlept] = (this.state.day1.wakeMood)
      }
    }
    if (this.state.day2) {
      if (this.state.day2.timeSlept in sleepScores) {
        sleepScores[this.state.day2.timeSlept] += (this.state.day2.wakeMood)
      } else {
        sleepScores[this.state.day2.timeSlept] = (this.state.day2.wakeMood)
      }
    }
    if (this.state.day3) {
      if (this.state.day3.timeSlept in sleepScores) {
        sleepScores[this.state.day3.timeSlept] += (this.state.day3.wakeMood)
      } else {
        sleepScores[this.state.day3.timeSlept] = (this.state.day3.wakeMood)
      }
    }
    if (this.state.day4) {
      if (this.state.day4.timeSlept in sleepScores) {
        sleepScores[this.state.day4.timeSlept] += (this.state.day4.wakeMood)
      } else {
        sleepScores[this.state.day4.timeSlept] = (this.state.day4.wakeMood)
      }
    }
    if (this.state.day5) {
      if (this.state.day5.timeSlept in sleepScores) {
        sleepScores[this.state.day5.timeSlept] += (this.state.day5.wakeMood)
      } else {
        sleepScores[this.state.day5.timeSlept] = (this.state.day5.wakeMood)
      }
    }
    if (this.state.day6) {
      if (this.state.day6.timeSlept in sleepScores) {
        sleepScores[this.state.day6.timeSlept] += (this.state.day6.wakeMood)
      } else {
        sleepScores[this.state.day6.timeSlept] = (this.state.day6.wakeMood)
      }
    }
    let maxScore = 0
    let optimalTimeslept = 0
    for (let key in sleepScores) {
      if (sleepScores[key] > maxScore) {
        maxScore = sleepScores[key]
        optimalTimeslept = key
      }
    }
    return optimalTimeslept;
  }

  // calculateMood = (mood) => {
  //   if (mood=1) {
  //     return -1
  //   } else if (mood=2) {
  //     return 0
  //   } else if (mood-3) {
  //     return 1
  //   } else if (mood=4) {
  //     return 2
  //   }
  // }

  render() {
    return (
      <div>
        <div className="landing-upper">
          <div className="weeklystats">
            <h2>Your Week in Review</h2>
            <div className="linegraph">  
              <Line data={this.state.graphData} 
                width={500}
                height={300}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
          <button className="lognew-button" onClick={this.togglePopup.bind(this)}>Log a new sleep entry</button>
          {this.state.showPopup ?
              <EntryForm 
              addEntry={this.addEntry} 
              closePopup={this.togglePopup.bind(this)} 
              /> 
              : null
            }
          </div>
        <div>
          <h2>Your optimal sleep time is: {this.calculateWeekaverage()} hours</h2>
          <Switch>
            <Route path="/home/sleep/:id" render={props =>
                <UpdateSleepEntry sleepstat={this.state.active} updateEntry={this.updateEntry} {...props}/>} 
              />
            <Route path="/" render={props => 
              <SleepEntryList sleepstats={this.state.sleepstats} deleteEntry={this.deleteEntry} setActive={this.setActive}/>
            }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Landing;
