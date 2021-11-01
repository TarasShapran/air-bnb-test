const router = require('express')
    .Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
const {userRoles: {ADMIN}} = require('../configs');

router.get(
    '/',
    userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.isUserEmailExistMiddleware,
    userController.createUser);

router.put(
    '/',
    fileMiddleware.checkUserAvatar,
    userController.addAvatar
);

router.delete(
    '/:user_id',
    userMiddleware.checkUserIdMiddleware,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([ADMIN]),
    userController.deleteUser);

router.get(
    '/:user_id',
    userMiddleware.checkUserIdMiddleware,
    userController.getUserById);

router.put(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.updateUserMiddleware,
    userMiddleware.checkUserIdMiddleware,
    userController.updateUser);

module.exports = router;
