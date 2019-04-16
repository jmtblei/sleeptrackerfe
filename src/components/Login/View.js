import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginNav from './LoginNav';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div>
                <LoginNav/>
                <Switch>
                    <Route
                    exact path="/login"
                    render={(...props) => (<LoginPage
                        handleChange={this.props.handleChange}
                        loggedIn={this.props.loggedIn}
                        username={this.state.username}
                        password={this.state.password}
                        {...props} />)}
                    />
                    <Route
                    exact path="/register" component={SignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default View;