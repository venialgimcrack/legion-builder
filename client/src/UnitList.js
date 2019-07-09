import React from 'react';
import _ from 'lodash';

import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import UnitListItem from './UnitListItem';

const UnitList = ({ classes, rank, ownedUnits, otherUnits }) => {
    // TODO need handler for removing unit
    let ownedUnitIds = _.keys(ownedUnits),
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
};

const styles = {
    root: {
        width: '100%'
    }
};

export default withStyles(styles)(UnitList);
