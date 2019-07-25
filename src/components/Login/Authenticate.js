import React from 'react';
import axios from 'axios';

const URL = "https://sleeptrackerredeploy.herokuapp.com/";

const Authenticate = App => Login =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = ({
                username:"",
                password:"",
                loggedIn: false
            })
        }

        componentDidMount() {
            if (localStorage.getItem("userdata")) {
                const userdata = localStorage.getItem('userdata')
                axios
                  .post(`${URL}/api/auth/checkauth`, {token: userdata.token})
                  .then(res => {
                      this.setState({ loggedIn: true });
                  })
                  .catch(err => console.log(err))
            }
        }
        
        handleChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        loggedIn = event => {
            event.preventDefault();
            return axios
                .post(`${URL}/api/auth/login`, {
                    username: this.state.username,
                    password: this.state.password
                })
                .then(res => {
                    localStorage.setItem("userdata", res.data.token);
                    localStorage.setItem("userid", res.data.user_id);
                    this.setState({
                        loggedIn: true
                    });
                    this.props.history.push('/home');
                })
                .catch(err => alert(err));
        }

        loggedOut = event => {
            event.preventDefault();
            window.localStorage.clear();
            this.setState({
                loggedIn: false
            })
            this.props.history.push('/login');
        }

        render() {
            if (this.state.loggedIn) {
                return <App loggedOut={this.loggedOut}
                loggedIn={this.state.loggedIn}
                />
            } else {
                return <Login
                handleChange={this.handleChange}
                loggedIn={this.loggedIn}
                username={this.state.username}
                password={this.state.password}
                />
            }
        }
    }

export default Authenticate;