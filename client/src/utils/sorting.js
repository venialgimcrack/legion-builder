const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
};

export const stableSort = (items, comp) => {
    const stabilized = items.map((el, index) => [ el, index ]);

    stabilized.sort((a, b) => {
        const order = comp(a[0], b[0]);

        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });

    return stabilized.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};
