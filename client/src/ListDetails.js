import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// TODO need to pull the faction list from config/constant
export default ({ name, faction, description, errors, onChange }) => (
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
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="rebel">Rebel Alliance</MenuItem>
                <MenuItem value="empire">Galactic Empire</MenuItem>
            </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="desc">Description</InputLabel>
            <Input id="desc" name="desc" value={description} onChange={onChange} />
        </FormControl>
    </React.Fragment>
);
