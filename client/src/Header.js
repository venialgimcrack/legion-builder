import React from 'react';
import { connect } from 'react-redux';

import { logout } from './actions/login';

const Header = ({ username, isAuthenticated, logout }) => {
    return (
        <div>
            <div>Legion Builder</div>
            {
                isAuthenticated ? (
                    <div>
                        <div>Welcome, {username}!</div>
                        <div><button onClick={logout}>Log out</button></div>
                    </div>
                ) : null
            }
            <hr />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        username: state.user.user.name,
        isAuthenticated: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
