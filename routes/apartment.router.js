const router = require('express')
    .Router();

const {apartmentMiddleware,userMiddleware, authMiddleware, bookingMiddleware} = require('../middlewares');
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
    authMiddleware.checkAccessToken,
    apartmentMiddleware.checkApartmentIdAndUserIdMiddleware,
    apartmentController.deleteApartment);

router.put(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentMiddleware.checkApartmentIdAndUserIdMiddleware,
    apartmentController.updateApartment);

router.put(
    '/:apartment_id/star',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.isAddStarBodyValid,
    bookingMiddleware.isUserHaveAccessAddReview,
    apartmentController.addStarToApartment);

module.exports = router;
