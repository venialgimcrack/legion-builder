import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

class UnitControls extends Component {

    render () {
        const { classes, rank, units } = this.props;

        let unitItems = units.map((unit, index) => (
                <ListItem key={`${rank}-${index}`}>
                    <ListItemText primary={unit.name} />
                    <ListItemSecondaryAction>
                        <Checkbox />
                    </ListItemSecondaryAction>
                </ListItem>
            ));

        return (
            <List dense className={classes.root}>
                {unitItems}
            </List>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { list, rank } = ownProps,
        units = _.get(state, 'content.units'),
        filtered = units.filter(unit => unit.rank === rank && unit.faction === list.faction);

    return {
        units: filtered
    };
};

const mapDispatchToProps = {};

const connected = connect(mapStateToProps, mapDispatchToProps)(UnitControls);

const styles = {
    root: {
        width: '100%'
    }
};

export default withStyles(styles)(connected);
