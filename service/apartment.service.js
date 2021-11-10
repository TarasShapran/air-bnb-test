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
        const amountOfPlacesFilter = {};
        const priceFilter = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'country':
                        findObject.country = {$regex: `^${filters.country}`, $options: 'i'};
                        break;
                    case 'city':
                        findObject.city = {$regex: `^${filters.city}`, $options: 'i'};
                        break;
                    case 'number_of_rooms':
                        findObject.number_of_rooms = filters.number_of_rooms;
                        break;
                    case 'type':
                        const type_of_apartment = filters.type.split(';');

                        findObject.type = {$in: type_of_apartment};
                        break;
                    case 'amountOfPlaces.gte':
                        Object.assign(amountOfPlacesFilter, {$gte: +filters['amountOfPlaces.gte']});
                        break;
                    case 'amountOfPlaces.lte':
                        Object.assign(amountOfPlacesFilter, {$lte: +filters['amountOfPlaces.lte']});
                        break;
                    case 'price.gte':
                        Object.assign(priceFilter, {$gte: +filters['price.gte']});
                        break;
                    case 'price.lte':
                        Object.assign(priceFilter, {$lte: +filters['price.lte']});
                        break;
                }
            });
        if (Object.values(amountOfPlacesFilter).length) {
            findObject.amount_of_places = amountOfPlacesFilter;
        }
        if (Object.values(priceFilter).length) {
            findObject.price = priceFilter;
        }

        const orderBy = order === 'asc' ? 1 : -1;

        return Apartment
            .find(findObject)
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
