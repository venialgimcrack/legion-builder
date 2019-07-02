import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// TODO need to build menu items from config/constant
export default ({ name, faction, size, description, errors, onChange }) => (
    <React.Fragment>
        <FormControl margin="normal" required fullWidth error={errors.name}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" name="name" value={name} onChange={onChange} />
        </FormControl>
        <FormControl margin="normal" required fullWidth error={errors.faction}>
            <InputLabel htmlFor="faction">Faction</InputLabel>
            <Select
                value={faction}
                onChange={onChange}
                inputProps={{
                    name: 'faction',
                    id: 'faction'
                }}
            >
                <MenuItem value="rebel">Rebel Alliance</MenuItem>
                <MenuItem value="empire">Galactic Empire</MenuItem>
            </Select>
        </FormControl>
        <FormControl margin="normal" required fullWidth error={errors.size}>
            <InputLabel htmlFor="size">Army Size</InputLabel>
            <Select
                value={size}
                onChange={onChange}
                inputProps={{
                    name: 'size',
                    id: 'size'
                }}
            >
                <MenuItem value="standard">Standard (800 points)</MenuItem>
                <MenuItem value="grand">Grand (1600 points)</MenuItem>
            </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" name="description" value={description} onChange={onChange} />
        </FormControl>
    </React.Fragment>
);
