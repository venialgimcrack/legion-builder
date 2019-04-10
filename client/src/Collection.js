import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loadCollection, saveCollection } from './actions/collectionActions';
import { getProducts } from './actions/productActions';

class Collection extends Component {
    static getDerivedStateFromProps (props, state) {
        let diff = _.difference(props.collection, state.collection);

        if (diff.length > 0) {
            return {
                collection: props.collection
            };
        }

        return null;
    }

    constructor (props) {
        super(props);

        this.state = {
            collection: this.props.collection.slice()
        };
    }

    onChange = e => {
        let product = e.target.id,
            checked = e.target.checked,
            { collection } = this.state;
        
        if (checked) {
            collection.push(product);
        } else {
            _.pull(collection, product);
        }

        this.setState({ collection });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.saveCollection(this.state.collection);
    };

    componentDidMount () {
        this.props.loadCollection();
        this.props.getProducts();
    }

    render () {
        return (
            <div>
                <div>Collection</div>
                <form noValidate onSubmit={this.onSubmit}>
                    {
                        this.props.products.map((product, i) => {
                            let inputKey = `check_prod${i}`,
                                checked = this.state.collection.indexOf(product._id) !== -1;

                            return (
                                <div key={inputKey}>
                                    <input id={product._id} type="checkbox" onChange={this.onChange} checked={checked} />
                                    <label htmlFor={product._id}>{product.name}</label>
                                </div>
                            );
                        })
                    }
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        collection: _.get(state, 'collection.items', []),
        products: _.get(state, 'products.items', [])
    };
};

const mapDispatchToProps = {
    loadCollection,
    saveCollection,
    getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
