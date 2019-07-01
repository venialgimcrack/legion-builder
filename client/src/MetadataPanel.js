import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import MetadataControls from './MetadataControls';

class MetadataPanel extends Component {
    handleChange = event => {
        this.props.onChange({ [ event.target.name ]: event.target.value });
    };

    render () {
        const { classes, expanded, list, onSave, isDirty } = this.props;

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
                label={
                    <Typography>Details</Typography>
                }
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
    }
};

export default withStyles(styles)(MetadataPanel);
