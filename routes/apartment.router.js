const router = require('express')
    .Router();

const {apartmentMiddleware,userMiddleware, authMiddleware} = require('../middlewares');
const {apartmentController} = require('../controllers');

router.post(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIdMiddleware,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.createApartment);

router.get(
    '/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    apartmentController.getApartmentById
);
router.get(
    '/',
    apartmentController.getApartment
);

module.exports = router;
