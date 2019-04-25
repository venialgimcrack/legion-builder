import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import FilterControlPanel from './FilterControlPanel';

class CollectionTable extends Component {
    constructor (props) {
        super(props);

        this.state = {
            filters: []
        };
    }

    handleFilterChange = active => {
        this.setState({
            filters: active
        });
    };

    FilteredTableBody = () => {
        const { classes, items, itemLabelKey, owned, onChange } = this.props,
            { filters } = this.state;

        let filteredItems = items.slice();

        filters.forEach(filter => {
            filteredItems = filteredItems.filter(item => item[filter.field] === filter.value);
        });

        return (
            <TableBody>
            {
                filteredItems.map((item, index) => {
                    let itemId = item.id,
                        rowKey = `item_${itemId}_${index}`,
                        ownedItem = owned.find(thing => thing.id === itemId),
                        value = ownedItem ? ownedItem.count : '',
                        cellText = item[itemLabelKey || 'name'];

                    if (item['subtitle']) {
                        cellText = `${cellText} (${item['subtitle']})`;
                    }

                    return (
                        <TableRow key={rowKey} className={classes.row}>
                            <TableCell component="th" scope="row">
                                {cellText}
                            </TableCell>
                            <TableCell>
                                <TextField type="number" id={itemId} value={value} onChange={onChange} />
                            </TableCell>
                        </TableRow>
                    );
                })
            }
            </TableBody>
        );
    };

    render () {
        const FilteredTableBody = this.FilteredTableBody,
            { classes, filterKeys } = this.props;

        return (
            <div className={classes.wrapper}>
                <FilterControlPanel
                    onChange={this.handleFilterChange}
                    filters={filterKeys}
                />
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
                    <FilteredTableBody />
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
