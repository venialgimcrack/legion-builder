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
        let { id, value } = e.target;

        this.setState(state => {
            let { collection } = state,
                owned = collection[group] || [];

            switch (group) {
                case 'products':
                    if (value > 0) {
                        let item = owned.find(item => item.id === id);                            

                        if (item) {
                            item.count = value;
                        } else {
                            owned.push({ id, count: value });
                        }
                    } else {
                        owned.splice(owned.findIndex(item => item.id === id), 1);
                    }
                    break;

                // TODO maths to figure out correct modifier attrs
                case 'units':
                case 'upgrades':
                default:
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
        this.props.load();
    }

    render () {
        const { classes, products } = this.props,
            { expanded, collection } = this.state;

        return (
            <div className={classes.root}>
                <form noValidate onSubmit={this.onSubmit}>
                    <ExpansionPanel expanded={expanded === 'products'} onChange={this.onExpand('products')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Products
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CollectionTable items={products} owned={collection.products} onChange={this.handleChange('products')} />
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'units'} onChange={this.onExpand('units')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Units
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>TODO: Unit table</Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'upgrades'} onChange={this.onExpand('upgrades')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Upgrades
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>TODO: Upgrades table</Typography>
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
        collection = _.get(state, 'collection.item');

    return {
        products,
        collection
    };
};

const mapDispatchToProps = {
    getProducts,
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
