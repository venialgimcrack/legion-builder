import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ListDetails from './ListDetails';

class NewListDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faction: '',
            name: '',
            description: '',
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
            { description, faction, name, errors } = this.state;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
            >
                <DialogTitle>New List</DialogTitle>
                <DialogContent>
                    <ListDetails
                        name={name}
                        faction={faction}
                        description={description}
                        errors={errors}
                        onChange={this.handleChange}
                    />
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
