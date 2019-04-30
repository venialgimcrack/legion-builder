import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import UnitControl from './UnitControl';

const UnitPanel = ({ faction, rank }) => (
    <FlatExpansionPanel
        label={
            <Typography>{`${rank.substring(0, 1).toUpperCase()}${rank.substring(1)}`}</Typography>
        }
        details={
            <UnitControl
                faction={faction}
                rank={rank}
            />
        }
    />
);

const styles = {};

export default withStyles(styles)(UnitPanel);
