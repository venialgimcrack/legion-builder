import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const FlatExpansionPanel = ({ expanded, onExpand, label, details, actions }) => {
    let panelActions = actions ? <ExpansionPanelActions>{actions}</ExpansionPanelActions> : null;

    return (
        <ExpansionPanel
            square
            expanded={expanded}
            onChange={onExpand}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{label}</ExpansionPanelSummary>
            <ExpansionPanelDetails>{details}</ExpansionPanelDetails>
            {panelActions}
        </ExpansionPanel>
    );
};

export default FlatExpansionPanel;
