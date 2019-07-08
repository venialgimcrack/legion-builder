import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import UnitListItem from './UnitListItem';
import { getOwnedUnits } from './utils/collectionCalculator';

class UnitControls extends Component {
    render () {
        const { classes, rank, otherUnits } = this.props;

        // TODO need component for displaying "listUnits"
        // TODO need handler for removing unit
        let ownedUnits = getOwnedUnits(),
            ownedUnitIds = ownedUnits.map(unit => unit.id),
            unitItems = otherUnits.map((unit, index) => {
                let itemKey = `${rank}-${index}`,
                    isOwned = ownedUnitIds.indexOf(unit.id) !== -1;

                // TODO need handler for adding unit
                return (
                    <UnitListItem
                        key={itemKey}
                        name={unit.name}
                        isOwned={isOwned}
                        onAdd={_.noop}
                    />
                );
            });

        return (
            <List className={classes.root}>
                {unitItems}
            </List>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { list, rank } = ownProps,
        listUnitIds = list.units.map(unit => unit.id),
        allUnits = _.get(state, 'content.units', []).filter(
            unit => unit.rank === rank && unit.faction === list.faction
        ),
        listUnits = [],
        otherUnits = [];

    allUnits.forEach(unit => {
        if (listUnitIds.indexOf(unit.id) !== -1) {
            listUnits.push(unit);
        } else {
            otherUnits.push(unit);
        }
    });

    return {
        allUnits,
        listUnits,
        otherUnits
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
