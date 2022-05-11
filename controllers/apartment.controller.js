const {Apartment} = require('../dataBase');
const {constants} = require('../configs');
const {apartmentService, s3Service} = require('../service');

module.exports = {
    createApartment: async (req, res, next) => {
        try {
            const {_id: user_id} = req.user;

            let apartment = await Apartment.create({...req.body, user_id});

            if (req.files && req.files.photos) {
                const {photos} = req.files;

                const uploadInfo = [];

                for (const value of photos) {
                    const upload = await s3Service.uploadImage(value, 'photos', apartment._id.toString());

                    uploadInfo.push(upload.Location);
                }

                apartment = await Apartment.findByIdAndUpdate(apartment._id, {photo: uploadInfo}, {new: true});
            }

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

            const newApartment = await Apartment.findByIdAndUpdate(apartment_id, req.body, {new: true});

            res.json(newApartment)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    },

    addStarToApartment: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const _id = apartment_id.toString();

            const {star} = req.body;

            const apartment = await Apartment.findOne({_id});

            let newApartment;

            if (!apartment.star_rating) {
                newApartment = await Apartment.findByIdAndUpdate(_id, {star_rating: star, number_of_star: 1}, {new: true});

                res.json(newApartment)
                    .status(constants.CREATED);

                return;
            }

            const avgStar = Math.round(((apartment.star_rating + star) / 2) * 100) / 100;

            let {number_of_star} = apartment;
            number_of_star += 1;

            newApartment = await Apartment.findByIdAndUpdate(_id, {
                star_rating: avgStar,
                number_of_star
            }, {new: true});

            res.json(newApartment)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    },
};
