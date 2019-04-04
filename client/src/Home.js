import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render () {
        return (
            <div>
                <div>Legion Builder</div>
                <div>
                    <ul>
                        <li><Link to="/lists">Lists</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
};
