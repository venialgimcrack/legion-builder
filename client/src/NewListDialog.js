import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MetadataControls from './MetadataControls';

class NewListDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            faction: '',
            size: 'standard',
            description: '',
            errors: {
                name: false,
                faction: false,
                size: false
            }
        };
    }

    get isValid () {
        const { name, faction, size } = this.state;

        return name && faction && size;
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
        const { name, faction, size, description } = this.state;

        if (this.isValid) {
            this.props.onAccept({ name, faction, size, description });

        } else {
            this.setState(state => {
                let { errors } = state;

                errors.name = !state.name;
                errors.faction = !state.faction;
                errors.size = !state.size;

                return { errors };
            });
        }
    };

    render () {
        const { open } = this.props,
            { description, size, faction, name, errors } = this.state;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
            >
                <DialogTitle>New List</DialogTitle>
                <DialogContent>
                    <MetadataControls
                        name={name}
                        faction={faction}
                        size={size}
                        description={description}
                        errors={errors}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handleAccept} color="primary" disabled={!this.isValid}>Accept</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default NewListDialog;
