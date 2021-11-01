const {Apartment} = require('../dataBase');
const {constants} = require('../configs');

module.exports = {
    createApartment: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const apartment = await Apartment.create({...req.body,user_id});

            res.json(apartment)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    }
};
