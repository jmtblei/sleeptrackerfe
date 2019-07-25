import React from 'react'
import { Link } from 'react-router-dom';
class HomePageNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUp: false
        }
    }

    render() {
        return (
        <div>
            <nav>
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/login" onClick={this.props.loggedOut} className="nav-link">Logout</Link>
            </nav>
        </div>
        )
    }
}

export default HomePageNav;
