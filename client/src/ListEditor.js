import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { loadCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';
import { getContent } from './actions/contentActions';
import UnitPanel from './UnitPanel';

class ListEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            faction: 'rebels'
        };
    }

    componentDidMount () {
        // TODO need some kind of busy indicator
        this.props.getProducts();
        this.props.getContent();
        this.props.load();
    }

    render () {
        const { classes } = this.props,
            { faction } = this.state;

        // TODO panels for other ranks
        return (
            <div className={classes.root}>
                <form noValidate>
                    <UnitPanel
                        faction={faction}
                        rank="corps"
                    />
                </form>
            </div>
        );
    }
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    getProducts,
    getContent,
    load: loadCollection
};

const connected = connect(mapStateToProps, mapDispatchToProps)(ListEditor);

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
