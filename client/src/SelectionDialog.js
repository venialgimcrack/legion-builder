import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SelectionDialog = ({ open, onClose, title, items, itemLabelKey }) => (
    <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
    >
        <DialogTitle>{title}</DialogTitle>
        <div>
            <List>
                {
                    items.map((item, index) => {
                        const itemId = item.id,
                            itemKey = `${itemId}_${index}`,
                            itemText = item[itemLabelKey || 'name'];

                        return (
                            <ListItem key={itemKey} button onClick={onClose(itemId)}>
                                <ListItemText primary={itemText} />
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
    </Dialog>
);

export default SelectionDialog;
