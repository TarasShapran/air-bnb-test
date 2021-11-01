const router = require('express')
    .Router();

const {carController} = require('../controllers');
const {carMiddleware, userMiddleware, authMiddleware} = require('../middlewares');

router.get(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIdMiddleware,
    carController.getCars);

router.post(
    '/:user_id',
    carMiddleware.isCarBodyValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIdMiddleware,
    carController.createCar);

router.delete(
    '/:car_id',
    carMiddleware.checkCarIdMiddleware,
    authMiddleware.checkAccessToken,
    carController.deleteCar);

router.get(
    '/:car_id',
    carMiddleware.checkCarIdMiddleware,
    authMiddleware.checkAccessToken,
    carController.getCarById);

router.put(
    '/:car_id',
    carMiddleware.checkIsCarBodyUpdateValid,
    authMiddleware.checkAccessToken,
    carMiddleware.checkCarIdMiddleware,
    carController.updateCar);

module.exports = router;
