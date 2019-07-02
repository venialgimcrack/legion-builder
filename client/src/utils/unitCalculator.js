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

        case 'operative':
        case 'heavy':
            return 2;

        case 'special':
        case 'support':
            return size === 'grand' ? 5 : 3;

        case 'corps':
            return size === 'grand' ? 10 : 6;

        default:
    }

    return 0;
};

export const calculateMin = (size, rank) => {
    switch (rank) {
        case 'commander':
            return 1;

        case 'corps':
            return size === 'grand' ? 6 : 3;

        case 'operative':
        case 'special':
        case 'support':
        case 'heavy':
        default:
            break;
    }

    return 0;
};
