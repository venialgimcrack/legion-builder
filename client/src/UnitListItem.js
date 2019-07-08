import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';

export default ({ name, isOwned, onAdd }) => (
    <ListItem>
        <ListItemText
            primary={name}
            primaryTypographyProps={{
                color: isOwned ? 'default' : 'textSecondary'
            }}
        />
        <ListItemSecondaryAction>
            <IconButton onClick={onAdd}><AddIcon fontSize="small" /></IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);