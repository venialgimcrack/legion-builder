import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

class ListViewer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            value: 'all'
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render () {
        const { classes } = this.props,
            { value } = this.state;

        return (
            <Paper className={classes.root}>
                <List className={classes.list}></List>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    className={classes.nav}
                    showLabels
                >
                    <BottomNavigationAction label="All" value="all" />
                    <BottomNavigationAction label="Rebels" value="rebel" />
                    <BottomNavigationAction label="Imperials" value="empire" />
                </BottomNavigation>
            </Paper>
        );
    }
}

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
    },
    list: {
    },
    nav: {
        width: '100%'
    }
});

export default withStyles(styles)(ListViewer);
