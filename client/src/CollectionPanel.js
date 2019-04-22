import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CollectionPanel = ({ classes, expanded, onExpand, label, details }) => (
    <ExpansionPanel expanded={expanded} onChange={onExpand}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon fontSize="small" />}
            classes={{
                root: classes.summaryRoot,
                content: classes.summaryContent,
                expanded: 'expanded'
            }}
        >
            {label}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetail}>
            {details}
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
            <Button type="submit" size="small" color="primary">Save</Button>
        </ExpansionPanelActions>
    </ExpansionPanel>
);

const styles = theme => ({
    // TODO media queries to calculate based on screen size
    summaryRoot: {
        padding: '8px 16px 8px',
        minHeight: 32,
        '&.expanded': {
            minHeight: 32
        },
        transition: 'none'
    },
    summaryContent: {
        margin: 0,
        '&.expanded': {
            margin: 0
        }
    },
    panelDetail: {
        padding: theme.spacing.unit
    }
});

export default withStyles(styles)(CollectionPanel);
