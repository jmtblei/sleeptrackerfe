import React, { Component }  from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <div className="login">
                <h2>Please Log In</h2>
                <form className="login-form"onSubmit={this.props.loggedIn}>
                    <h4>Username</h4>
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.props.handleChange}
                    />
                    <h4>Password</h4>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password123"
                    value={this.props.password}
                    onChange={this.props.handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginPage;