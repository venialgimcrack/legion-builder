import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
// import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class FilterToolbar extends Component {
    constructor (props) {
        super(props);

        this.state = {
            menuAnchor: null
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

    render () {
        const { classes } = this.props;
        const { menuAnchor } = this.state;

        let isOpen = !!menuAnchor;

        return (
            <Toolbar>
                <div className={classes.chips}>
                    <Typography>Filters: None</Typography>
                </div>
                <div className={classes.spacer} />
                <div className={classes.action}>
                    <IconButton onClick={this.handleOpen}>
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        id="menu-filters"
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
                        <MenuItem onClick={this.handleClose}>Core/Expansion</MenuItem>
                        <MenuItem onClick={this.handleClose}>Rebel/Empire</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        );
    }
}

const styles = {
    chips: {
        flex: '0 0 auto'
    },
    spacer: {
        flex: '1 1 100%'
    }
};

export default withStyles(styles)(FilterToolbar);
