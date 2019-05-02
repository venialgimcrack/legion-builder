import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class ListEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            faction: 'rebels'
        };
    }

    render () {
        const { classes, match } = this.props;
        
        let listId = _.get(match, 'params.id', 'new');

        return (
            <div className={classes.root}>
                <Typography>
                    { listId === 'new' ? 'Creating a new list!' : `Editing list ${listId}` }
                </Typography>
            </div>
        );
    }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connected = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListEditor));

const styles = theme => ({
    root: {
        width: 'auto',
        margin: theme.spacing.unit * 2,
        [ theme.breakpoints.down(320 + theme.spacing.unit * 4) ]: {
            width: 320,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [ theme.breakpoints.up(640 + theme.spacing.unit * 4) ]: {
            width: 640,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
});

export default withStyles(styles)(connected);
