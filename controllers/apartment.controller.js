const {Apartment} = require('../dataBase');
const {constants} = require('../configs');
const {apartmentService} = require('../service');

module.exports = {
    createApartment: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const apartment = await Apartment.create({...req.body, user_id});

            res.json(apartment)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },
    getApartmentById: (req, res, next) => {
        try {
            const {apartment} = req;

            res.json(apartment);
        } catch (e) {
            next(e);
        }
    },
    getApartment: async (req, res, next) => {
        try {
            const apartment = await apartmentService.getAllApartment(req.query);

            res.json(apartment);
        } catch (e) {
            next(e);
        }
    },

    deleteApartment: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            await Apartment.deleteOne({_id: apartment_id});

            res.sendStatus(constants.NO_CONTENT);
        } catch (err) {
            next(err);
        }
    },

    updateApartment: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const newApartment = await Apartment.findByIdAndUpdate(apartment_id, req.body, {new: true})
                .lean();

            res.json(newApartment)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    },
};
