import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FilterControl from './FilterControl';

class FilterControlPanel extends Component {
    constructor (props) {
        super(props);

        this.state = {
            menuAnchor: null,
            // TODO need to pull this out, supply as props
            filters: [
                {
                    id: 'cat1',
                    field: 'category',
                    value: '',
                    options: [
                        { label: 'Core Sets', value: 'core' },
                        { label: 'Expansions', value: 'expansions' }
                    ],
                    label: 'Category',
                    active: false
                }, {
                    id: 'fac1',
                    field: 'faction',
                    value: '',
                    options: [
                        { label: 'Rebel Alliance', value: 'rebel' },
                        { label: 'Galactic Empire', value: 'empire' }
                    ],
                    label: 'Faction',
                    active: false
                }
            ]
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

    handleFilterChange = filterId => e => {
        let { value } = e.target;

        this.setState(state => {
            let { filters } = state,
                filter = filters.find(f => f.id === filterId);

            filter.value = value;

            return { filters };
        });
    };

    handleFilterDelete = filterId => () => {
        this.setState(state => {
            let { filters } = state,
                filter = filters.find(f => f.id === filterId);

            filter.active = false;

            return { filters };
        });
    };

    handleFilterActive = filterId => () => {
        this.setState(state => {
            let { filters } = state,
                filter = filters.find(f => f.id === filterId),
                menuAnchor = null;

            filter.active = true;

            return {
                menuAnchor,
                filters
            };
        });
    };

    FilterControls = () => {
        const { classes } = this.props,
            { filters } = this.state;

        let activeFilters = filters.filter(f => f.active),
            controls = activeFilters.map((props, idx) => (
                <FilterControl
                    key={`filterControl${idx}`}
                    onChange={this.handleFilterChange(props.id)}
                    onDelete={this.handleFilterDelete(props.id)}
                    { ...props }
                />
            ));

        if (controls.length === 0) {
            controls = <Typography className={classes.noFilters}>No Filters Selected</Typography>;
        }

        return controls;
    };

    FilterSelectMenu = () => {
        const { menuAnchor, filters } = this.state;

        let isOpen = !!menuAnchor,
            inactiveFilters = filters.filter(f => !f.active),
            items = inactiveFilters.map((props, idx) => (
                <MenuItem
                    key={`filterMenu${idx}`}
                    onClick={this.handleFilterActive(props.id)}
                >
                    {props.label}
                </MenuItem>
            )),
            disabled = items.length === 0;

        return (
            <React.Fragment>
                <IconButton onClick={this.handleOpen} disabled={disabled}>
                    <FilterListIcon fontSize="small" />
                </IconButton>
                <Menu
                    id="filterMenu"
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
                        subheader:
                            <ListSubheader>Choose Filter</ListSubheader>
                    }}
                >
                    {items}
                </Menu>
            </React.Fragment>
        );
    };

    render () {
        const FilterControls = this.FilterControls,
            FilterSelectMenu = this.FilterSelectMenu;

        const { classes } = this.props;

        return (
            <Toolbar disableGutters={true} variant="dense">
                <div className={classes.filters}>
                    <FilterControls />
                </div>
                <div className={classes.action}>
                    <FilterSelectMenu />
                </div>
            </Toolbar>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%'
    },
    filters: {
        display: 'flex',
        flexDirection: 'column'
    },
    noFilters: {
        marginLeft: theme.spacing.unit
    },
    action: {
        marginLeft: 'auto'
    }
});

export default withStyles(styles)(FilterControlPanel);
