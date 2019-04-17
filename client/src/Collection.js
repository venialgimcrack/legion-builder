import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { loadCollection, saveCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';

class Collection extends Component {
    static getDerivedStateFromProps (props, state) {
        let diff = _.difference(props.collection, state.collection);

        if (diff.length > 0) {
            return {
                collection: props.collection
            };
        }

        return null;
    }

    constructor (props) {
        super(props);

        this.state = {
            collection: this.props.collection.slice()
        };
    }

    onExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    onChange = e => {
        let product = e.target.id,
            checked = e.target.checked,
            { collection } = this.state;
        
        if (checked) {
            collection.push(product);
        } else {
            _.pull(collection, product);
        }

        this.setState({ collection });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.saveCollection(this.state.collection);
    };

    componentDidMount () {
        this.props.getProducts();
        this.props.loadCollection();
    }

    render () {
        const { classes } = this.props,
            { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'core'} onChange={this.onExpand('core')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Core Sets
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form noValidate>
                            <List dense className={classes.list}>
                            {
                                this.props.products.filter(product => product.category === 'core').map((product, index) => {
                                    let itemKey = `prod_core_${index}`;

                                    return (
                                        <ListItem key={itemKey} alignItems="flex-start">
                                            <ListItemText primary={product.name} />
                                        </ListItem>
                                    );
                                })
                            }
                            </List>
                        </form>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" color="primary">Save</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'xpacks'} onChange={this.onExpand('xpacks')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Expansions
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form noValidate>
                            <List dense className={classes.list}>
                            {
                                this.props.products.filter(product => product.category === 'expansion').map((product, index) => {
                                    let itemKey = `prod_xpack_${index}`;

                                    return (
                                        <ListItem key={itemKey} alignItems="flex-start">
                                            <ListItemText primary={product.name} />
                                        </ListItem>
                                    );
                                })
                            }
                            </List>
                        </form>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" color="primary">Save</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        collection: _.get(state, 'collection.items', []),
        products: _.get(state, 'products.items', [])
    };
};

const mapDispatchToProps = {
    getProducts,
    loadCollection,
    saveCollection
};

const styles = theme => ({
    root: {
        width: 'auto',
        margin: theme.spacing.unit
    },
    list: {
        width: '100%'
    }
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Collection);
export default withStyles(styles)(connected);
