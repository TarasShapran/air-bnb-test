const router = require('express')
    .Router();

const {apartmentMiddleware,userMiddleware} = require('../middlewares');
const {apartmentController} = require('../controllers');

router.post(
    '/:user_id',
    userMiddleware.checkUserIdMiddleware,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.createApartment);

module.exports = router;
