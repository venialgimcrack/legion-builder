import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import DeleteIcon from '@material-ui/icons/Delete';

const FilterControl = ({ classes, field, value, options, label, onChange, onDelete }) => (
    <div className={classes.root}>
        <IconButton onClick={onDelete} className={classes.deleteButton}>
            <DeleteIcon fontSize="small" />
        </IconButton>
        <FormControl className={classes.control} fullWidth>
            <InputLabel htmlFor={`select-${field}`}>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                inputProps={{
                    id: `select-${field}`,
                    name: `select-${field}`
                }}
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {
                    options.map((option, idx) => (
                        <MenuItem
                            key={`select-${field}-option${idx}`}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </div>
);

const styles = theme => ({
    root: {
        display: 'flex'
    },
    control: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    deleteButton: {
        flex: '0 0 auto'
    }
});

export default withStyles(styles)(FilterControl);
