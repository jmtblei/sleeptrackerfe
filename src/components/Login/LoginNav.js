import React from 'react';
import { Link } from 'react-router-dom';


const LoginNav = (props) => {
    return (
        <div>
            <nav>
                <Link to="/login" className="nav-link">Log In</Link>
                <Link to="/register" className="nav-link">Sign Up</Link>
            </nav>
        </div>
    )
}

export default LoginNav;