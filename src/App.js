import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Authenticate from './components/Login/Authenticate';
import View from './components/Login/View';
import HomePageView from './components/HomePage/HomePageView';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faSmile, faSmileBeam, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';

// library.add(fab, faSmile, faSmileBeam, faMeh, faFrown)
class App extends Component {
  componentDidMount() { 
    if (!localStorage.getItem("userdata") && window.location.pathname !== '/register'){
    this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="App">
        <Auth/>
      </div>
    );
  }
}

const Auth = withRouter(Authenticate(HomePageView)(View));

export default withRouter(App);
