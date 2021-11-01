const {Apartment} = require('../dataBase');

module.exports = {
    getAllApartment: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        /*        const ageFilter = {};*/

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'country':
                        findObject.country = {$regex: `^${filters.country}`, $options: 'i'};
                        break;
                    case 'city':
                        findObject.city = {$regex: `^${filters.city}`, $options: 'i'};
                        break;
                    case 'type':
                        const type_of_apartment = filters.type.split(';');

                        findObject.type = {$in: type_of_apartment};
                        break;
                    /*                    case 'age.gte':
                                            Object.assign(ageFilter, {$gte: +filters['age.gte']});
                                            break;
                                        case 'age.lte':
                                            Object.assign(ageFilter, {$lte: +filters['age.lte']});
                                            break;*/
                }
            });
        /*        if (Object.values(ageFilter).length) {
                    findObject.age = ageFilter;
                }*/

        const orderBy = order === 'asc' ? 1 : -1;

        return Apartment
            .find(findObject)
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
