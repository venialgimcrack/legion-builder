import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { loadList } from './actions/listActions';

class ListEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            faction: 'rebels'
        };
    }

    componentDidMount () {
        if (this.props.listId !== 'new') {
            this.props.load(this.props.listId);
        }
    }

    render () {
        const { classes, listId } = this.props;

        return (
            <div className={classes.root}>
                <Typography>
                    { listId === 'new' ? 'Creating a new list!' : `Editing list ${listId}` }
                </Typography>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    listId: _.get(ownProps, 'match.params.id', 'new')
});

const mapDispatchToProps = {
    load: loadList
};

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
