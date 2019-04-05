import React from 'react';
import { connect } from 'react-redux';

import { logout } from './actions/login';

const Header = ({ isAuthenticated, logout }) => {
    return (
        <div>
            <div>Legion Builder</div>
            { isAuthenticated ? (<div>Welcome!&nbsp;<button onClick={logout}>Log out</button></div>) : null }
            <hr />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
