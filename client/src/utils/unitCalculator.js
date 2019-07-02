import _ from 'lodash';

export const calculateTotal = (list, rank) => {
    let listUnits = _.get(list, 'units', []),
        unitsForRank = listUnits.filter(listUnit => listUnit.rank === rank);

    return unitsForRank.length;
};

export const calculateMax = (size, rank) => {
    switch (rank) {
        case 'commander':
            return size === 'grand' ? 4 : 2;

        default:
    }

    return 0;
};

export const calculateMin = (size, rank) => {
    switch (rank) {
        case 'commander':
            return 1;

        default:
    }

    return 0;
};
