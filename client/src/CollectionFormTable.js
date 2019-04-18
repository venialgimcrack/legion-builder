import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class CollectionFormTable extends Component {

    handleSubmit = e => {
        e.preventDefault();
    };

    render () {
        const { classes, products } = this.props;

        return (
            <div className={classes.wrapper}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Table padding="none">
                        <colgroup>
                            <col />
                            <col width="50px" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="center"># Owned</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            products.map((product, index) => {
                                let rowKey = `prod_${product.category}_${index}`;

                                return (
                                    <TableRow key={rowKey}>
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" defaultValue={0} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                    </Table>
                </form>
            </div>
        );
    }
}

const styles = {
    wrapper: {
        width: '100%'
    }
};

export default withStyles(styles)(CollectionFormTable);
