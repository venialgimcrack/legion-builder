import React, { Component } from 'react';
// import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class CollectionFormTable extends Component {
    // static getDerivedStateFromProps (props, state) {
    //     let diff = _.difference(_.keys(props.collection), _.keys(state.collection));

    //     if (diff.length > 0) {
    //         return {
    //             collection: props.collection
    //         };

    //     } else {
    //         let valDiff = false;

    //         _.keys(props).forEach(propKey => {
    //             let propValue = props[propKey],
    //                 stateValue = state[propKey];
                
    //             if (propValue !== stateValue) {
    //                 valDiff = true;
    //                 return false;
    //             }
    //         });

    //         if (valDiff) {
    //             return {
    //                 collection: props.collection
    //             };
    //         }
    //     }

    //     return null;
    // }

    constructor (props) {
        super(props);

        this.state = {
            collection: {}
        };
    }

    handleChange = e => {
        let { id, value } = e.target;

        this.setState(state => {
            let { collection } = state;

            if (collection[id] && value <= 0) {
                delete collection[id];
            } else {
                collection[id] = value;
            }

            return { collection };
        });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    render () {
        const { classes, products } = this.props,
            { collection } = this.state;

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
                                let rowKey = `prod_${product.category}_${index}`,
                                    productId = product.id || product._id,
                                    count = collection[productId] || 0;

                                return (
                                    <TableRow key={rowKey}>
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" id={productId} value={count} onChange={this.handleChange} />
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
