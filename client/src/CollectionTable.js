import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class CollectionTable extends Component {
    render () {
        const { classes, items, itemLabelKey, owned, onChange } = this.props;
        return (
            <div className={classes.wrapper}>
                <Table padding="none">
                    <colgroup>
                        <col />
                        <col width="50px" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center"># Owned</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        items.map((item, index) => {
                            let itemId = item.id,
                                rowKey = `item_${itemId}_${index}`,
                                ownedItem = owned.find(thing => thing.id === itemId),
                                value = ownedItem ? ownedItem.count : '';

                            return (
                                <TableRow key={rowKey} className={classes.row}>
                                    <TableCell component="th" scope="row">
                                        {item[itemLabelKey || 'name']}
                                    </TableCell>
                                    <TableCell>
                                        <TextField type="number" id={itemId} value={value} onChange={onChange} />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
    },
    wrapper: {
        width: '100%'
    }
});

export default withStyles(styles)(CollectionTable);
