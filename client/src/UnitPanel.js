import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import UnitControls from './UnitControls';

const UnitPanel = ({ classes, expanded, onExpand, label }) => (
    <FlatExpansionPanel
        expanded={expanded}
        onExpand={onExpand}
        label={
            <Typography>{label}</Typography>
        }
        details={
            <div className={classes.root}>
                <UnitControls />
            </div>
        }
    />
);

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
};

export default withStyles(styles)(UnitPanel);
