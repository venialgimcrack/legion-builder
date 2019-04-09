import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts } from './actions/productActions';

class Collection extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <div>Collection</div>
                {
                    this.props.products.map(product => (<div>{product.name}</div>))
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.items
    };
};

const mapDispatchToProps = {
    getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
