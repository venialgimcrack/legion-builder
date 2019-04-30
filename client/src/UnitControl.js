import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import UnitCard from './UnitCard';

class UnitControl extends Component {
    constructor (props) {
        super(props);

        this.state = {
            unit: null
        };
    }

    handleUnitChange = unitId => {
        this.setState({
            unit: unitId
        });
    };

    render () {
        const { classes, faction, rank } = this.props,
            { unit } = this.state;

        return (
            <div className={classes.root}>
                <UnitCard
                    faction={faction}
                    rank={rank}
                    unit={unit}
                    onChange={this.handleUnitChange}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {};

const connected = connect(mapStateToProps, mapDispatchToProps)(UnitControl);

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
};

export default withStyles(styles)(connected);
