import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import FlatExpansionPanel from './FlatExpansionPanel';
import UnitControls from './UnitControls';
import UnitList from './UnitList';

import { getOwnedUnits } from './utils/collectionCalculator';
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
            { classes, expanded, onExpand, rank, otherUnits, listUnits } = this.props;

        let ownedUnits = getOwnedUnits(rank);

        return (
            <FlatExpansionPanel
                expanded={expanded}
                onExpand={onExpand}
                label={<UnitLabel />}
                details={
                    <div className={classes.root}>
                        <div className={classes.controls}>
                            <UnitControls
                                listUnits={listUnits}
                            />
                        </div>
                        <div className={classes.list}>
                            <UnitList
                                rank={rank}
                                ownedUnits={ownedUnits}
                                otherUnits={otherUnits}
                            />
                        </div>
                    </div>
                }
                actions={
                    <Button size="small" color="primary" disabled>Save</Button>
                }
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { list, rank } = ownProps,
        listUnitIds = _.get(list, 'units', []).map(unit => unit.id),
        allUnits = _.get(state, 'content.units', []).filter(
            unit => unit.rank === rank &&
                    unit.faction === list.faction
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
        listUnits,
        otherUnits
    };
};

const mapDispatchToProps = {};

const connected = connect(mapStateToProps, mapDispatchToProps)(UnitPanel);

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

export default withStyles(styles)(connected);
