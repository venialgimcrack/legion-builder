import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import MetadataControls from './MetadataControls';

import { calculateTotal, calculateSize } from './utils/listCalculator';

class MetadataPanel extends Component {
    MetadataLabel = () => {
        const { classes, list } = this.props,
            total = calculateTotal(list),
            size = calculateSize(list.size),
            colorProp = total > size ? 'error' : 'default';

        return (
            <React.Fragment>
                <div className={classes.lblCol1}>
                    <Typography>{list.name}</Typography>
                </div>
                <div className={classes.lblCol2}>
                    <Typography align="right" color={colorProp}>{`${total} / ${size}`}</Typography>
                </div>
            </React.Fragment>
        );
    };

    handleChange = event => {
        // TODO changing faction should clear the draft list's units
        this.props.onChange({ [ event.target.name ]: event.target.value });
    };

    render () {
        const MetadataLabel = this.MetadataLabel,
            { classes, expanded, onExpand, list, onSave, isDirty } = this.props;

        let { name, faction, size, description } = list,
            errors = {
                name: !name,
                faction: !faction,
                size: !size
            },
            saveDisabled = errors.name || errors.faction || errors.size || !isDirty;

        return (
            <FlatExpansionPanel
                expanded={expanded}
                onExpand={onExpand}
                label={<MetadataLabel />}
                details={
                    <div className={classes.root}>
                        <MetadataControls
                            name={name}
                            faction={faction}
                            size={size}
                            description={description}
                            errors={errors}
                            onChange={this.handleChange}
                        />
                    </div>
                }
                actions={
                    <Button size="small" color="primary" onClick={onSave} disabled={saveDisabled}>Save</Button>
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

export default withStyles(styles)(MetadataPanel);
