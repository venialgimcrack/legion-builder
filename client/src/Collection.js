import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { loadCollection, saveCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';
import { getContent } from './actions/contentActions';
import CollectionPanel from './CollectionPanel';
import CollectionTable from './CollectionTable';

class Collection extends Component {
    static getDerivedStateFromProps (props, state) {
        const groups = [ 'products', 'units', 'upgrades' ];

        let propChange = false;

        groups.forEach(group => {
            let propItems = _.get(props, `collection.${group}`, []),
                stateItems = _.get(state, `collection.${group}`, []);

            if (_.isEqual(propItems, stateItems)) {
                propChange = true;
                return false;
            }
        });

        if (propChange) {
            return {
                collection: props.collection
            };
        }

        return null;
    }

    constructor (props) {
        super(props);

        this.state = {
            expanded: 'products',
            collection: props.collection
        };
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
        this.setState(state => {
            let { collection } = state,
                owned = collection.products;

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

            collection.products = owned;

            return { collection };
        });
    };

    handleOtherChange = (group, id, delta) => {
        this.setState(state => {
            let { collection } = state,
                owned = collection[group];

            let item = owned.find(item => item.id === id);

            if (item) {
                item.modifier += delta;
            } else {
                owned.push({ id, modifier: delta });
            }

            // TODO remove items with '0' modifier?

            collection[group] = owned;

            return { collection };
        });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.save(this.state.collection);
    };

    onExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    getOwnedList = group => {
        if (group === 'products') {
            return this.state.collection.products;

        } else {
            let results = [],
                modifiers = this.state.collection[group];

            // Compose list with raw counts first
            this.state.collection.products.forEach(product => {
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
                }
            });

            return results;
        }
    };

    componentDidMount () {
        this.props.getProducts();
        this.props.getContent();
        this.props.load();
    }

    render () {
        const { classes, products, units, upgrades } = this.props,
            { expanded } = this.state;

        return (
            <div className={classes.root}>
                <form noValidate onSubmit={this.onSubmit}>
                    <CollectionPanel
                        expanded={expanded === 'products'}
                        onExpand={this.onExpand('products')}
                        label={
                            <Typography>Products</Typography>
                        }
                        details={
                            <CollectionTable
                                items={products}
                                owned={products.length > 0 ? this.getOwnedList('products') : []}
                                onChange={this.handleChange('products')}
                            />
                        }
                    />
                    <CollectionPanel
                        expanded={expanded === 'units'}
                        onExpand={this.onExpand('units')}
                        label={
                            <Typography>Units</Typography>
                        }
                        details={
                            <CollectionTable
                                items={units}
                                owned={units.length > 0 ? this.getOwnedList('units') : []}
                                onChange={this.handleChange('units')}
                            />
                        }
                    />
                    <CollectionPanel
                        expanded={expanded === 'upgrades'}
                        onExpand={this.onExpand('upgrades')}
                        label={
                            <Typography>Upgrades</Typography>
                        }
                        details={
                            <CollectionTable
                                items={upgrades}
                                itemLabelKey="title"
                                owned={upgrades.length > 0 ? this.getOwnedList('upgrades') : []}
                                onChange={this.handleChange('upgrades')}
                            />
                        }
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
        collection = _.get(state, 'collection.item');

    return {
        products,
        units,
        upgrades,
        collection
    };
};

const mapDispatchToProps = {
    getProducts,
    getContent,
    load: loadCollection,
    save: saveCollection
};

const styles = theme => ({
    root: {
        width: 'auto',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
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

const connected = connect(mapStateToProps, mapDispatchToProps)(Collection);
export default withStyles(styles)(connected);
