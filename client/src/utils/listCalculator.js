import _ from 'lodash';

import store from '../store';

export const calculateTotal = list => {
    const { units, upgrades } = store.getState();

    let listUnits = _.get(list, 'units', []),
        unitUpgrades,
        total = 0,
        unit,
        upgrade;

    listUnits.forEach(listUnit => {
        unit = units.find(u => u.id === listUnit.id);

        if (unit) {
            total += unit.points;
        }

        unitUpgrades = _.get(listUnit, 'upgrades', []);

        unitUpgrades.forEach(unitUpgrade => {
            upgrade = upgrades.find(u => u.id === unitUpgrade.id);

            if (upgrade) {
                total += upgrade.points;
            }
        });
    });

    return total;
};

export const calculateSize = size => {
    switch (size) {
        case 'standard':
            return 800;

        case 'grand':
            return 1600;

        default:
            break;
    }

    return 0;
};
