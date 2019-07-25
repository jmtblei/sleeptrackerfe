import React from 'react';
import axios from 'axios';

const URL = "https://sleeptrackerredeploy.herokuapp.com";
class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                date:'',
                timeSlept:null,
                sleepMood:null,
                wakeMood:null
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("userdata");
        const headers = {headers: {"content-type":"application/JSON", Authorization:token}}
        const {id} = this.props.match.params
        axios
        .get(`${URL}/api/sleep/${id}`, headers)
        .then(res => {
            this.setState({ timeSlept: res.data.timeSlept, sleepMood: res.data.sleepMood, wakeMood: res.data.wakeMood, date: res.data.date })
        })
        .catch(err => console.log(err))
    }
    

    sleepmoodFrownOnClick = () => {
        this.setState({
            sleepMood: 1
        })
    }

    sleepmoodMehOnClick = () => {
        this.setState({
            sleepMood: 2
        })
    }

    sleepmoodSmileOnClick = () => {
        this.setState({
            sleepMood: 3
        })
    }

    sleepmoodSmilebeamOnClick = () => {
        this.setState({
            sleepMood: 4
        })
    }

    wakemoodFrownOnClick = () => {
        this.setState({
            wakeMood: 1
        })
    }
    wakemoodMehOnClick = () => {
        this.setState({
            wakeMood: 2
        })
    }
    wakemoodSmileOnClick = () => {
        this.setState({
            wakeMood: 3
        })
    }
    wakemoodSmilebeamOnClick = () => {
        this.setState({
            wakeMood: 4
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // getDate = () => {
    //     let today = new Date();
    //     let dd = today.getDate();
    //     let mm = today.getMonth() + 1; //January is 0!

    //     const yyyy = today.getFullYear();
    //     if (dd < 10) {
    //     dd = '0' + dd;
    //     } 
    //     if (mm < 10) {
    //     mm = '0' + mm;
    //     } 
    //     const newdate = yyyy + '-' + mm + '-' + dd;
    //     return newdate;
    // }

    render() {
        return (
                    <div className="dec-grad">
                        <h2>Update Sleep Entry</h2>
                        <form onSubmit={e => this.props.updateEntry(e, {id: this.props.sleepstat.id, timeSlept: this.state.timeSlept, sleepMood: this.state.sleepMood, wakeMood: this.state.wakeMood, date: this.state.date})}>
                            <h4>Total hours slept</h4>
                            <input
                            type="number"
                            onChange={this.handleChange}
                            name="timeSlept"
                            />
                            <h4>Mood at bed time:</h4>
                            <span className="emojis">
                                1
                                <i className="far fa-frown" onClick={this.sleepmoodFrownOnClick}></i>
                                <i className="far fa-meh" onClick={this.sleepmoodMehOnClick}></i>
                                <i className="far fa-smile" onClick={this.sleepmoodSmileOnClick}></i>
                                <i className="far fa-smile-beam" onClick={this.sleepmoodSmilebeamOnClick}></i>
                                4
                            </span>
                            <h4>Mood when waking:</h4>
                            <span className="emojis">
                                Tired
                                <i className="far fa-frown" onClick={this.wakemoodFrownOnClick}></i>
                                <i className="far fa-meh" onClick={this.wakemoodMehOnClick}></i>
                                <i className="far fa-smile" onClick={this.wakemoodSmileOnClick}></i>
                                <i className="far fa-smile-beam" onClick={this.wakemoodSmilebeamOnClick}></i>
                                Great!
                            </span>
                            <div>
                                <button className="entry-button" type="submit">Update Entry</button>
                            </div>
                        </form>
                    </div>
        )
    }
}

export default UpdateForm;