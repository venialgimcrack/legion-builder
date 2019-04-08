import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LoggedIn = () => {
    return (
        <div>
            <ul>
                <li><Link to="/lists">Lists</Link></li>
                <li><Link to="/collection">Collection</Link></li>
            </ul>
        </div>
    );
};

const LoggedOut = () => {
    return (
        <div>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    );
};

const Home = ({ isAuthenticated }) => {
    return isAuthenticated ? <LoggedIn /> : <LoggedOut />;
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
