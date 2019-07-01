import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';

import { stableSort, getSorting } from './utils/sorting';
import FilterControlPanel from './FilterControlPanel';

class CollectionTable extends Component {
    constructor (props) {
        super(props);

        this.state = {
            filters: [],
            order: 'asc',
            orderBy: props.identColumn
        };
    }

    handleFilterChange = active => {
        this.setState({
            filters: active
        });
    };

    handleValueChange = oldValue => event => {
        const { onChange } = this.props;

        let { id, value } = event.target;

        onChange(id, value, oldValue);
    };

    handleRequestSort = column => () => {
        this.setState(state => {
            const { order, orderBy } = state,
                isDesc = orderBy === column && order === 'desc';

            return {
                order: isDesc ? 'asc' : 'desc',
                orderBy: column
            };
        });
    };

    SortableTableHead = () => {
        const { identColumn, identLabel } = this.props,
            { order, orderBy } = this.state;

        return (
            <TableHead>
                <TableRow>
                    <TableCell sortDirection={orderBy === identColumn ? order : false}>
                        <TableSortLabel active={orderBy === identColumn} direction={order} onClick={this.handleRequestSort(identColumn)}>
                            {identLabel}
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="center"># Owned</TableCell>
                </TableRow>
            </TableHead>
        );
    };

    FilteredTableBody = () => {
        const { classes, items, identColumn, owned } = this.props,
            { filters, order, orderBy } = this.state;

        let filteredItems = items.slice();

        filters.forEach(filter => {
            let { field, value } = filter;

            if (field && value) {
                filteredItems = filteredItems.filter(item => {
                    let itemValue = item[field];

                    if (_.isArray(itemValue)) {
                        return !!itemValue.find(itemVal => _.isEqual(itemVal, value));
                    } else {
                        return _.isEqual(itemValue, value);
                    }
                });
            }
        });

        return (
            <TableBody>
            {
                stableSort(filteredItems, getSorting(order, orderBy)).map((item, index) => {
                    let itemId = item.id,
                        rowKey = `item_${itemId}_${index}`,
                        ownedItem = owned.find(thing => thing.id === itemId),
                        value = ownedItem && ownedItem.count > 0 ? `${ownedItem.count}` : '',
                        cellText = item[identColumn];

                    if (item['subtitle']) {
                        cellText = `${cellText} (${item['subtitle']})`;
                    }

                    return (
                        <TableRow key={rowKey} className={classes.row}>
                            <TableCell component="th" scope="row">
                                {cellText}
                            </TableCell>
                            <TableCell>
                                <TextField type="number" id={itemId} value={value} onChange={this.handleValueChange(value)} />
                            </TableCell>
                        </TableRow>
                    );
                })
            }
            </TableBody>
        );
    };

    render () {
        const SortableTableHead = this.SortableTableHead,
            FilteredTableBody = this.FilteredTableBody,
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
                    <SortableTableHead />
                    <FilteredTableBody />
                </Table>
            </div>
        );
    }
}

CollectionTable.defaultProps = {
    identColumn: 'name'
};

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
