import _ from 'lodash';

import store from '../store';

export const getOwnedItems = (group, draft = true, rank = false) => {
    const { collection, products, content } = store.getState();

    // Don't try to calculate if data is still loading.
    if (collection.loading || products.loading) {
        return [];
    }

    let part = draft ? 'draft' : 'saved',
        results = {};

    if (group === 'products') {
        collection[part].products.forEach(product => results[product.id] = product.count);
        return results;
    }

    let productItems = products.items,
        allItems = content[group],
        modifiers = _.get(collection, `[${part}][${group}]`, []),
        // TODO come up with better rank filtering mechanism
        rankFilter = thing => {
            if (!rank) { return true; }
            let item = allItems.find(item => item.id === thing.id);
            return item && item.rank === rank;
        };

    // Compose list with raw counts first
    collection[part].products.forEach(product => {
        let fullProd = productItems.find(prod => prod.id === product.id),
            prodContents = _.get(fullProd, `contents[${group}]`, []),
            prodCount = product.count;

        prodContents.filter(rankFilter).forEach(item => {
            if (!results[item.id]) {
                results[item.id] = 0;
            }

            results[item.id] += (item.count * prodCount);
        });
    });

    // Iterate over and apply modifier values
    modifiers.filter(rankFilter).forEach(modder => {
        if (!results[modder.id] && modder.modifier !== 0) {
            results[modder.id] = modder.modifier;

        } else if (modder.modifier !== 0) {
            results[modder.id] += modder.modifier;
        }
    });

    return _.pickBy(results, result => result > 0);
};

// Convenience shortcuts for use in the unit/upgrade list panels.
export const getOwnedUnits = rank => getOwnedItems('units', false, rank);
export const getOwnedUpgrades = rank => getOwnedItems('upgrades', false, rank);
