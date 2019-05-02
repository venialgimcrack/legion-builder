import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import { getLists } from './actions/listActions';

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

    handleClick = listId => event => {
        console.log(event);
        console.log(`Clicked on list with ID: ${listId}`);
    };

    componentDidMount () {
        // TODO need some kind of busy indicator
        this.props.load();
    }

    render () {
        const { classes, lists } = this.props,
            { value } = this.state;

        let filtered = lists.slice(),
            listItems;

        if (value !== 'all') {
            filtered = filtered.filter(list => list.faction === value);
        }

        if (filtered.length > 0) {
            listItems = filtered.map((list, index) => {
                let key = `listItem${index}`,
                    listItemProps = {
                        primary: list.name
                    };

                if (list.description) {
                    listItemProps.secondary = list.description;
                }

                return (
                    <ListItem button key={key} onClick={this.handleClick(list._id)}>
                        <ListItemText { ...listItemProps } />
                    </ListItem>
                );
            });

        } else {
            listItems =
                <ListItem>
                    <ListItemText primary="No matching list(s) found." />
                </ListItem>;
        }

        return (
            <Paper className={classes.root}>
                <List component="nav" className={classes.list}>
                    { listItems }
                </List>
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

const mapStateToProps = state => {
    let lists = _.get(state, 'list.all', []);

    return { lists };
};

const mapDispatchToProps = {
    load: getLists
};

const connected = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListViewer));

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

export default withStyles(styles)(connected);
