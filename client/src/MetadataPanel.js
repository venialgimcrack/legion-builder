import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FlatExpansionPanel from './FlatExpansionPanel';
import MetadataControls from './MetadataControls';

class MetadataPanel extends Component {
    render () {
        const { classes, list } = this.props;

        let { name, faction, description } = list,
            errors = {
                name: !name,
                faction: !faction
            };

        return (
            <FlatExpansionPanel
                expanded={true}
                label={
                    <Typography>Details</Typography>
                }
                details={
                    <div className={classes.root}>
                        <MetadataControls
                            name={name}
                            faction={faction}
                            description={description}
                            errors={errors}
                            onChange={()=>{}}
                        />
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
    }
};

export default withStyles(styles)(MetadataPanel);
