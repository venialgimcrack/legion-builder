import React from 'react';
import { connect } from 'react-redux';

import { logout } from './actions/loginActions';

const Header = ({ username, isLoggedIn, logout }) => (
    <div>
        <div>Legion Builder</div>
        {
            isLoggedIn ? (
                <div>
                    <div>Welcome, {username}!</div>
                    <div><button onClick={logout}>Log out</button></div>
                </div>
            ) : null
        }
        <hr />
    </div>
);

const mapStateToProps = state => {
    const { login } = state;

    return {
        username: login.user.name,
        isLoggedIn: login.auth
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
