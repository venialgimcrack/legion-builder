import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import { loadList, saveList, createNewList, updateList, resetList } from './actions/listActions';
import MetadataPanel from './MetadataPanel';
import NewListDialog from './NewListDialog';

class ListEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            expanded: 'meta',
            showDialog: false,
            canceled: false,
            saved: false
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

    handleAccept = ({ name, faction, description }) => {
        this.setState({ showDialog: false });

        this.props.create(name, faction, description);
    };

    handleMetadataUpdate = update => {
        let { current } = this.props,
            updated = Object.assign({}, current, update);

        this.props.update(updated);
    };

    handleSave = () => {
        this.props.save(this.props.current);
    };

    componentDidMount () {
        this.props.reset();

        if (this.shouldLoadList()) {
            this.props.load(this.props.listId);
        } else {
            this.showNewListDialog();
        }
    }

    componentDidUpdate () {
        if (this.shouldLoadList()) {
            this.setState({ saved: true });

        } else if (this.state.saved) {
            this.setState({ saved: false });
        }
    }

    render () {
        const { classes, current } = this.props,
            { expanded, showDialog, canceled, saved } = this.state;

        if (canceled) {
            return <Redirect to="/" />;
        }

        if (saved) {
            return <Redirect to={`/lists/${current._id}`} />;
        }

        return (
            <div className={classes.root}>
                <MetadataPanel
                    expanded={expanded === 'meta'}
                    list={current}
                    onChange={this.handleMetadataUpdate}
                    onSave={this.handleSave}
                />
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
    current: _.get(state, 'list.current')
});

const mapDispatchToProps = {
    load: loadList,
    create: createNewList,
    reset: resetList,
    update: updateList,
    save: saveList
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
