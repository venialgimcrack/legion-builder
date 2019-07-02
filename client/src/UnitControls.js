import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

class UnitControls extends Component {

    render () {
        const { classes } = this.props;

        return (
            <div className={classes.root} />
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {};

const connected = connect(mapStateToProps, mapDispatchToProps)(UnitControls);

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
};

export default withStyles(styles)(connected);
