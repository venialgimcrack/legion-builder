import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class FilterToolbar extends Component {
    constructor (props) {
        super(props);

        this.state = {
            menuAnchor: null,
            filters: []
        };
    }

    handleOpen = e => {
        this.setState({
            menuAnchor: e.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            menuAnchor: null
        });
    };

    handleClick = filter => () => {
        this.setState(state => ({
            menuAnchor: null,
            filters: state.filters.concat(filter)
        }));
    };

    handleDelete = filter => () => {
        this.setState(state => {
            let { filters } = state,
                index = filters.indexOf(filter);

            if (index >= 0) {
                filters.splice(index, 1);
            }

            return { filters };
        });
    };

    componentDidUpdate () {
        // TODO invoke onFilterChange prop
    }

    render () {
        const { classes } = this.props;
        const { menuAnchor, filters } = this.state;

        let isOpen = !!menuAnchor,
            filterChips = filters.length > 0 ?
                filters.map((filter, index) => <Chip key={`${filter}_${index}`} label={filter} onDelete={this.handleDelete(filter)} /> ) : <Typography>Filters: None</Typography>;

        return (
            <Toolbar disableGutters={true} variant="dense">
                <div className={classes.chips}>
                    {filterChips}
                </div>
                <div className={classes.action}>
                    <IconButton onClick={this.handleOpen}>
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        id="menu-filters"
                        disableAutoFocusItem={true}
                        anchorEl={menuAnchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={isOpen}
                        onClose={this.handleClose}
                        MenuListProps={{
                            subheader: <ListSubheader>Filter By</ListSubheader>
                        }}
                    >
                        <MenuItem onClick={this.handleClick('core')}>Core Sets</MenuItem>
                        <MenuItem onClick={this.handleClick('expansion')}>Expansions</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        );
    }
}

const styles = {
    chips: {
    },
    action: {
        marginLeft: 'auto'
    }
};

export default withStyles(styles)(FilterToolbar);
