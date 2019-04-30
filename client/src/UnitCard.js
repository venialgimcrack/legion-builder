import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const UnitCard = ({ classes, faction, rank, unit, onChange }) => {
    return (
        <div className={classNames(classes.root, classes.empty)}>
            <Button color="primary" className={classes.button}>Select Unit</Button>
        </div>
    );
};

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing.unit,
        width: 420,
        height: 300,
        [ theme.breakpoints.down('sm') ]: {
            width: 280,
            height: 200
        },
        [ theme.breakpoints.up('lg') ]: {
            width: 420,
            height: 300
        }
    },
    empty: {
        border: '2px dashed rgba(0, 0, 0, .125)',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        height: '100%'
    }
});

export default withStyles(styles)(UnitCard);
