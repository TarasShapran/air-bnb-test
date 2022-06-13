const router = require('express')
    .Router();

const {apartmentMiddleware, authMiddleware, bookingMiddleware, userMiddleware} = require('../middlewares');
const {apartmentController} = require('../controllers');

router.get(
    '/me',
    authMiddleware.checkAccessToken,
    apartmentController.getMyApartment);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.createApartment);

router.get(
    '/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    apartmentController.getApartmentById);

router.get(
    '/:user_id/my',
    userMiddleware.checkUserIdMiddleware,
    apartmentController.getApartmentByUserId);

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
