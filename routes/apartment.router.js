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
    apartmentController.getApartmentById);

router.get(
    '/',
    apartmentController.getApartment);

router.delete(
    '/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    authMiddleware.checkAccessToken,
    apartmentController.deleteApartment);

router.put(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.checkApartmentIdMiddleware,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.updateApartment);

module.exports = router;
