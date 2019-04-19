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
        return null;
    }

    constructor (props) {
        super(props);

        this.state = {
            collection: props.collection
        };
    }

    onExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    onChange = e => {
        e.preventDefault();

        // let { id, value } = e.target;
    };

    onSubmit = e => {
        e.preventDefault();
    };

    componentDidMount () {
        this.props.getProducts();
        this.props.load();
    }

    render () {
        const { classes, products } = this.props,
            { expanded } = this.state,
            cores = products.filter(prod => prod.category === 'core'),
            expansions = products.filter(prod => prod.category === 'expansion');

        return (
            <div className={classes.root}>
                <form noValidate onSubmit={this.onSubmit}>
                    <ExpansionPanel expanded={expanded === 'core'} onChange={this.onExpand('core')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Core Sets
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CollectionTable products={cores} />
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button type="submit" size="small" color="primary">Save</Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'xpacs'} onChange={this.onExpand('xpacs')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Expansions
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CollectionTable products={expansions} />
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
    return {
        products: _.get(state, 'products.items', []),
        collection: _.get(state, 'collection.item', {})
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
