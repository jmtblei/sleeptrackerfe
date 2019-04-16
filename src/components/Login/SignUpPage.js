import React from 'react';
import axios from 'axios';

const URL = "https://sleeper-app.herokuapp.com";
class SignUpPage extends React.Component {
    constructor() {
        super();
        this.state = {
            fullname:"",
            username:"",
            email:"",
            password:"",
            verifypassword:""
        };
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = event => {
        event.preventDefault();
        if (this.state.password === this.state.verifypassword) {
            axios
                .post(`${URL}/api/auth/register`, {
                    fullname: this.state.fullname,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
                .then(res => {
                    console.log("It worked!", res)
                    alert('Your account has been registered')
                })
                .catch(err => console.log('Error', err));
                this.setState({
                    fullname:"",
                    username:"",
                    email:"",
                    password:"",
                    verifypassword:""
                })
        }
    }

    render() {
        return (
            <div className="register">
                <h2>Create An Account</h2>
                <form className="register-form" onSubmit={this.register}>
                    <h4>Your full name</h4>
                    <input
                    type="text"
                    name="fullname"
                    placeholder="John Smith"
                    value={this.state.fullname}
                    onChange={this.handleChange}
                    />
                    <h4>Select a username</h4>
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    />
                    <h4>Enter your email</h4>
                    <input
                    type="email"
                    name="email"
                    placeholder="Youremail@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                    <h4>Select a password</h4>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password123"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />
                    <h4>Verify your password</h4>
                    <input
                    type="password"
                    name="verifypassword"
                    placeholder="Password123"
                    value={this.state.verifypassword}
                    onChange={this.handleChange}
                    required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default SignUpPage;