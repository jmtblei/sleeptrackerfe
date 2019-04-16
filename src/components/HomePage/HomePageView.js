import React from 'react';
import HomePageNav from './HomePageNav';
import { Route } from 'react-router-dom';
import Landing from './Landing';

class HomePageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        <div>
           <HomePageNav loggedOut={this.props.loggedOut}/>
           <Route exact path='/home' component={Landing}/>
        </div>
        )
    }
}

export default HomePageView;
