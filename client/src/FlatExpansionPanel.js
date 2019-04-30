import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        }
    },
    expanded: {
        margin: 'auto'
    }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        // backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        }
    },
    expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2
    }
}))(MuiExpansionPanelDetails);

const FlatExpansionPanel = ({ expanded, onExpand, label, details, actions }) => (
    <ExpansionPanel
        square
        expanded={expanded}
        onChange={onExpand}
    >
        <ExpansionPanelSummary>{label}</ExpansionPanelSummary>
        <ExpansionPanelDetails>{details}</ExpansionPanelDetails>
        <ExpansionPanelActions>{actions}</ExpansionPanelActions>
    </ExpansionPanel>
);

export default FlatExpansionPanel;
