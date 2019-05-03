import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class NewListDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faction: '',
            name: '',
            errors: {
                faction: false,
                name: false
            }
        };
    }

    handleChange = event => {
        let { name, value } = event.target;

        this.setState(state => {
            let { errors } = state;

            errors[name] = false;

            return {
                [ name ]: value,
                errors
            };
        });
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    handleAccept = () => {
        if (this.state.faction && this.state.name) {
            this.props.onAccept(this.state);

        } else {
            this.setState(state => {
                let { errors } = state;

                errors.faction = !state.faction;
                errors.name = !state.name;

                return { errors };
            });
        }
    };

    render () {
        const { open } = this.props,
            { faction, name, errors } = this.state;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
            >
                <DialogTitle>New List</DialogTitle>
                <DialogContent>
                    <FormControl margin="normal" required fullWidth error={errors.faction}>
                        <InputLabel htmlFor="faction">Faction</InputLabel>
                        <Select
                            value={faction}
                            onChange={this.handleChange}
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
                    <FormControl margin="normal" required fullWidth error={errors.name}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name" value={name} onChange={this.handleChange} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handleAccept} color="primary">Accept</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default NewListDialog;
