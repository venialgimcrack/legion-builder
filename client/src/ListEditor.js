import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { loadList, createNewList } from './actions/listActions';
import NewListDialog from './NewListDialog';

class ListEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            faction: 'rebels',
            showDialog: false,
            canceled: false
        };
    }

    shouldLoadList = () => {
        let { listId, current } = this.props,
            currentId = _.get(current, '_id', null);

        return listId !== 'new' && listId !== currentId;
    };

    showNewListDialog = () => {
        this.setState({
            showDialog: true,
            canceled: false
        });
    };

    handleCancel = () => {
        this.setState({
            showDialog: false,
            canceled: true
        });
    };

    handleAccept = ({ name, faction }) => {
        this.setState({ showDialog: false });

        this.props.create(name, faction);
    };

    componentDidMount () {
        if (this.shouldLoadList()) {
            this.props.load(this.props.listId);
        } else {
            this.showNewListDialog();
        }
    }

    render () {
        const { classes, listId } = this.props,
            { showDialog, canceled } = this.state;

        if (canceled) {
            return <Redirect to="/" />;
        }

        return (
            <div className={classes.root}>
                <Typography>
                    { listId === 'new' ? 'Creating a new list!' : `Editing list ${listId}` }
                </Typography>
                <NewListDialog
                    open={showDialog}
                    onCancel={this.handleCancel}
                    onAccept={this.handleAccept}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listId: _.get(ownProps, 'match.params.id', 'new'),
    current: _.get(state, 'list.current', null)
});

const mapDispatchToProps = {
    load: loadList,
    create: createNewList
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
