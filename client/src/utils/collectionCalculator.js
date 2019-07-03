import _ from 'lodash';

import store from '../store';

export const getOwnedItems = (group, draft = true) => {
    const { collection, products } = store.getState();

    // Don't try to calculate if data is still loading.
    if (collection.loading || products.loading) {
        return [];
    }

    let part = draft ? 'draft' : 'saved';

    if (group === 'products') {
        return _.get(collection, `[${part}].products`, []);
    }

    let productItems = products.items,
        results = [],
        modifiers = _.get(collection, `[${part}][${group}]`, []);

    // Compose list with raw counts first
    collection[part].products.forEach(product => {
        let fullProd = productItems.find(prod => prod.id === product.id),
            prodContents = _.get(fullProd, `contents[${group}]`, []),
            prodCount = product.count;

        prodContents.forEach(item => {
            let result = results.find(res => res.id === item.id);

            if (result) {
                result.count += (item.count * prodCount);
            } else {
                results.push({
                    id: item.id,
                    count: item.count * prodCount
                });
            }
        });
    });

    // Iterate over and apply modifier values
    modifiers.forEach(modder => {
        let item = results.find(res => res.id === modder.id);

        if (item && modder.modifier !== 0) {
            item.count += modder.modifier;

        } else {
            results.push({
                id: modder.id,
                count: modder.modifier
            });
        }
    });

    return results.filter(result => result.count > 0);
};

// Convenience shortcuts for use in the unit/upgrade list panels.
export const getOwnedUnits = () => getOwnedItems('units', false);
export const getOwnedUpgrades = () => getOwnedItems('upgrades', false);
