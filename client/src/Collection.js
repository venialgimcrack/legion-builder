import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { loadCollection, saveCollection, editCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';
import { getContent } from './actions/contentActions';
import CollectionTable from './CollectionTable';
import FlatExpansionPanel from './FlatExpansionPanel';

const FILTER_KEYS = {
        products: [ 'category', 'faction' ],
        units: [ 'faction', 'rank' ],
        upgrades: [ 'kind', 'align' ]
    };

class Collection extends Component {
    constructor (props) {
        super(props);

        this.state = {
            expanded: 'products'
        };
    }

    get isDirty () {
        const { draft, saved } = this.props;
        return !_.isEqual(draft, saved);
    }

    handleChange = group => e => {
        let { id, value, defaultValue } = e.target,
            count = Number(value);

        if (group === 'products') {
            this.handleProductChange(id, count);

        } else {
            let prevCount = Number(defaultValue);

            this.handleOtherChange(group, id, count - prevCount);
        }
    };

    handleProductChange = (id, count) => {
        let { draft } = this.props,
            owned = draft.products.slice();

        if (count > 0) {
            let item = owned.find(item => item.id === id);

            if (item) {
                item.count = count;
            } else {
                owned.push({ id, count });
            }

        } else {
            let index = owned.findIndex(item => item.id === id);

            if (index >= 0) {
                owned.splice(index, 1);
            }
        }

        this.props.edit('products', owned);
    };

    handleOtherChange = (group, id, delta) => {
        let { draft } = this.props,
            owned = draft[group].slice();

        let item = owned.find(item => item.id === id);

        // TODO remove items with '0' modifier?
        if (item) {
            item.modifier += delta;
        } else {
            owned.push({ id, modifier: delta });
        }

        this.props.edit(group, owned);
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.save();
    };

    onExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    getOwnedList = group => {
        if (group === 'products') {
            return this.props.draft.products;

        } else {
            let results = [],
                modifiers = this.props.draft[group];

            // Compose list with raw counts first
            this.props.draft.products.forEach(product => {
                let fullProd = this.props.products.find(prod => prod.id === product.id),
                    prodContents = fullProd.contents[group],
                    prodCount = product.count;

                prodContents.forEach(item => {
                    let result = results.find(res => res.id === item.id);

                    if (result) {
                        result.count += (item.count * prodCount);
                    } else {
                        results.push({
                            id: item.id,
                            count: item.count * prodCount
                        });
                    }
                });
            });

            // Iterate over and apply modifier values
            modifiers.forEach(modder => {
                let item = results.find(res => res.id === modder.id);

                if (item && modder.modifier !== 0) {
                    item.count += modder.modifier;
                } else {
                    results.push({
                        id: modder.id,
                        count: modder.modifier
                    });
                }
            });

            return results;
        }
    };

    componentDidMount () {
        // TODO need some kind of busy indicator
        this.props.getProducts();
        this.props.getContent();
        this.props.load();
    }

    GroupExpansionPanel = ({ group, label, ...other }) => {
        const { expanded } = this.state,
            filterKeys = FILTER_KEYS[group];

        let items = this.props[group],
            showTable = items.length > 0,
            saveDisabled = !showTable || !this.isDirty,
            panelLabel =
                <Typography>{label}</Typography>,
            details = showTable ?
                <CollectionTable
                    items={items}
                    owned={this.getOwnedList(group)}
                    onChange={this.handleChange(group)}
                    filterKeys={filterKeys}
                    { ...other }
                /> : <div />,
            action =
                <Button type="submit" size="small" color="primary" disabled={saveDisabled}>Save</Button>;

        return (
            <FlatExpansionPanel
                expanded={expanded === group}
                onExpand={this.onExpand(group)}
                label={panelLabel}
                details={details}
                actions={action}
            />
        );
    };

    render () {
        const GroupExpansionPanel = this.GroupExpansionPanel,
            { classes } = this.props;

        return (
            <div className={classes.root}>
                <form noValidate onSubmit={this.onSubmit}>
                    <GroupExpansionPanel
                        group="products"
                        label="Products"
                        identLabel="Name"
                    />
                    <GroupExpansionPanel
                        group="units"
                        label="Units"
                        identLabel="Name"
                    />
                    <GroupExpansionPanel
                        group="upgrades"
                        label="Upgrades"
                        identColumn="title"
                        identLabel="Title"
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let products = _.get(state, 'products.items'),
        units = _.get(state, 'content.units'),
        upgrades = _.get(state, 'content.upgrades'),
        draft = _.get(state, 'collection.draft'),
        saved = _.get(state, 'collection.saved');

    return {
        products,
        units,
        upgrades,
        draft,
        saved
    };
};

const mapDispatchToProps = {
    getProducts,
    getContent,
    load: loadCollection,
    save: saveCollection,
    edit: editCollection
};

const connected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection));

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
