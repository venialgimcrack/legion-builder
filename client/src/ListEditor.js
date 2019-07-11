import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import { loadList, saveList, createNewList, editList, resetList } from './actions/listActions';
import { loadCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';
import { getContent } from './actions/contentActions';
import MetadataPanel from './MetadataPanel';
import UnitPanel from './UnitPanel';
import NewListDialog from './NewListDialog';

// TODO define a constant for these somewhere
const UNIT_RANKS = [ 'commander', 'operative', 'corps', 'special', 'support', 'heavy' ];

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

    get isDirty () {
        const { draft, saved } = this.props;
        return !_.isEqual(draft, saved);
    }

    shouldLoadList = () => {
        let { listId, draft } = this.props,
            currentId = _.get(draft, '_id', null);

        return listId !== 'new' && listId !== currentId;
    };

    wasListSaved = () => {
        let { listId, draft } = this.props,
            currentId = _.get(draft, '_id', null);

        return listId === 'new' && !!currentId;
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

    handleAccept = metadata => {
        this.setState({ showDialog: false });

        this.props.create(metadata);
    };

    handleMetadataUpdate = update => {
        let { draft } = this.props,
            edited = Object.assign({}, draft, update);

        // TODO changing faction should clear the draft list's units

        this.props.edit(edited);
    };

    handleSave = () => {
        this.props.save();
    };

    handleExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        })
    };

    componentDidMount () {
        const { content, products, collection } = this.props;

        this.props.reset();

        // TODO need busy indicators

        if (content && !content.loading && (!content.units.length || !content.upgrades.length)) {
            this.props.getContent();
        }

        if (products && !products.loading && !products.items.length) {
            this.props.getProducts();
        }

        if (collection && !collection.loading && !!collection.saved) {
            this.props.loadCollection();
        }

        if (this.shouldLoadList()) {
            this.props.load(this.props.listId);

        } else {
            this.showNewListDialog();
        }
    }

    componentDidUpdate () {
        if (this.wasListSaved()) {
            // If the update was from saving a new list, set a flag that
            // triggers a redirect to /lists/{id}
            this.setState({ saved: true });

        } else if (this.state.saved) {
            // Otherwise reset the flag
            this.setState({ saved: false });
        }
    }

    render () {
        const { classes, draft } = this.props,
            { expanded, showDialog, canceled, saved } = this.state;

        if (canceled) {
            return <Redirect to="/" />;
        }

        if (saved) {
            return <Redirect to={`/lists/${draft._id}`} />;
        }

        let unitPanels = UNIT_RANKS.map((rank, index) => (
                <UnitPanel
                    key={`unitPanel${index}`}
                    expanded={expanded === rank}
                    onExpand={this.handleExpand(rank)}
                    list={draft}
                    rank={rank}
                />
            ));

        return (
            <div className={classes.root}>
                <MetadataPanel
                    expanded={expanded === 'meta'}
                    onExpand={this.handleExpand('meta')}
                    list={draft}
                    onChange={this.handleMetadataUpdate}
                    onSave={this.handleSave}
                    isDirty={this.isDirty}
                />
                {unitPanels}
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
    draft: _.get(state, 'list.draft'),
    saved: _.get(state, 'list.saved'),
    content: _.get(state, 'content'),
    products: _.get(state, 'products'),
    collection: _.get(state, 'collection')
});

const mapDispatchToProps = {
    load: loadList,
    create: createNewList,
    reset: resetList,
    edit: editList,
    save: saveList,
    loadCollection,
    getContent,
    getProducts
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
