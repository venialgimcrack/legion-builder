import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import UnitControls from './UnitControls';

import { calculateTotal, calculateMax, calculateMin } from './utils/unitCalculator';

class UnitPanel extends Component {
    UnitLabel = () => {
        const { classes, list, rank } = this.props,
            total = calculateTotal(list, rank),
            max = calculateMax(list.size, rank),
            min = calculateMin(list.size, rank),
            colorProp = total > max || total < min ? 'error' : 'default';

        // TODO replace 'rank' text label with icon
        return (
            <React.Fragment>
                <div className={classes.lblCol1}>
                    <Typography>{rank}</Typography>
                </div>
                <div className={classes.lblCol2}>
                    <Typography align="right" color={colorProp}>{`${total} / (${min}-${max})`}</Typography>
                </div>
            </React.Fragment>
        );
    };

    render () {
        const UnitLabel = this.UnitLabel,
            { classes, expanded, onExpand } = this.props;

        return (
            <FlatExpansionPanel
                expanded={expanded}
                onExpand={onExpand}
                label={<UnitLabel />}
                details={
                    <div className={classes.root}>
                        <UnitControls />
                    </div>
                }
            />
        );
    }
}

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    lblCol1: {
        flexBasis: '60%'
    },
    lblCol2: {
        flexBasis: '40%',
        alignSelf: 'center'
    }
};

export default withStyles(styles)(UnitPanel);
