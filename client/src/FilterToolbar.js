import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import Divider from '@material-ui/core/Divider';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
// import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

class FilterToolbar extends Component {
    constructor (props) {
        super(props);

        console.log(props);

        this.state = {
            menuAnchor: null,
            active: []
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
            active: state.active.concat(filter)
        }));
    };

    handleDelete = filter => () => {
        this.setState(state => {
            let { active } = state,
                index = active.indexOf(filter);

            if (index >= 0) {
                active.splice(index, 1);
            }

            return { active };
        });
    };

    componentDidUpdate () {
        // TODO invoke onFilterChange prop?
    }

    render () {
        const { classes } = this.props,
            { menuAnchor, active } = this.state;

        let isOpen = !!menuAnchor,
            items = [{ id: 'core', text: 'Core Sets' }, { id: 'expansion', text: 'Expansions' }],
            inactive = items.filter(item => active.indexOf(item.id) === -1),
            menuItems = inactive.map((item, idx) => (
                <MenuItem
                    key={`${item.id}_${idx}`}
                    onClick={this.handleClick(item.id)}
                >
                    {item.text}
                </MenuItem>
            )),
            filterChips = null;

        if (active.length > 0) {
            filterChips = active.map((filter, index) => <Chip key={`${filter}_${index}`} label={filter} onDelete={this.handleDelete(filter)} /> );
        }

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
                        id="prodFilterMenu"
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
                    >
                        <MenuItem disabled divider>Categories</MenuItem>
                        { menuItems.length > 0 ? menuItems : null }
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
