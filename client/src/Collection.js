import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { loadCollection, saveCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';
import { getContent } from './actions/contentActions';
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

    onExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    handleChange = group => e => {
        let { id, value } = e.target,
            count = Number(value);

        this.setState(state => {
            let { collection } = state,
                owned = collection[group] || [];

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

            collection[group] = owned;

            return { collection };
        });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.save(this.state.collection);
    };

    componentDidMount () {
        this.props.getProducts();
        this.props.getContent();
        this.props.load();
    }

    render () {
        const { classes, products, units, upgrades } = this.props,
            { expanded, collection } = this.state;
            // TODO compose "owned" list for units, upgrades

        return (
            <div className={classes.root}>
                <form noValidate onSubmit={this.onSubmit}>
                    <ExpansionPanel expanded={expanded === 'products'} onChange={this.onExpand('products')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon fontSize="small" />}
                            classes={{
                                root: classes.summaryRoot,
                                content: classes.summaryContent,
                                expanded: 'expanded'
                            }}
                        >
                            <Typography>
                                Products
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetail}>
                            <CollectionTable items={products} owned={collection.products} onChange={this.handleChange('products')} />
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'units'} onChange={this.onExpand('units')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon fontSize="small" />}
                            classes={{
                                root: classes.summaryRoot,
                                content: classes.summaryContent,
                                expanded: 'expanded'
                            }}
                        >
                            <Typography>
                                Units
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetail}>
                            <CollectionTable items={units} owned={[]} onChange={_.noop} />
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'upgrades'} onChange={this.onExpand('upgrades')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon fontSize="small" />}
                            classes={{
                                root: classes.summaryRoot,
                                content: classes.summaryContent,
                                expanded: 'expanded'
                            }}
                        >
                            <Typography>
                                Upgrades
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelDetail}>
                            <CollectionTable items={upgrades} itemLabelKey="title" owned={[]} onChange={_.noop} />
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
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
    },
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

const connected = connect(mapStateToProps, mapDispatchToProps)(Collection);
export default withStyles(styles)(connected);
