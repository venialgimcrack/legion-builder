import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import { getOwnedUnits } from './utils/collectionCalculator';

class UnitControls extends Component {
    render () {
        const { classes, rank, allUnits } = this.props;

        let ownedUnits = getOwnedUnits(),
            ownedUnitIds = ownedUnits.map(unit => unit.id),
            // TODO need to use numeric inputs instead of checkboxes
            unitItems = allUnits.map((unit, index) => {
                let itemKey = `${rank}-${index}`,
                    isOwned = ownedUnitIds.indexOf(unit.id) !== -1,
                    // Display un-owned units in grey text
                    color = isOwned ? 'default' : 'textSecondary';

                // TODO need to reflect owned unit count in UI

                return (
                    <ListItem key={itemKey}>
                        <ListItemText
                            primary={unit.name}
                            primaryTypographyProps={{
                                color
                            }}
                        />
                        <ListItemSecondaryAction>
                            <Checkbox />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            });

        return (
            <List dense className={classes.root}>
                {unitItems}
            </List>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { list, rank } = ownProps,
        allUnits = _.get(state, 'content.units');

    allUnits = allUnits.filter(
        unit => unit.rank === rank && unit.faction === list.faction
    );

    return {
        allUnits
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
