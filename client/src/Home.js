import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from './actions/login';

class Home extends Component {
    render () {
        return this.props.isAuthenticated ? (
            <div>
                <ul>
                    <li><Link to="/lists">Lists</Link></li>
                    <li><Link to="/collection">Collection</Link></li>
                </ul>
                <div>
                    <button onClick={this.props.logout}>Log me out</button>
                </div>
            </div>
        ) : (
            <div>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign-up</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
