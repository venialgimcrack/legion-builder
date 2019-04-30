import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const UpgradeCard = ({ classes }) => (
    <div className={classes.root}></div>
);

const styles = theme => ({
    root: {
        border: '2px dashed rgba(0, 0, 0, .125)',
        borderRadius: '5px',
        margin: theme.spacing.unit,
        width: 110,
        height: 180,
        [ theme.breakpoints.down('sm') ]: {
            width: 55,
            height: 90
        },
        [ theme.breakpoints.up('lg') ]: {
            width: 110,
            height: 180
        }
    }
});

export default withStyles(styles)(UpgradeCard);
