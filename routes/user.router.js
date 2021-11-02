const router = require('express')
    .Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
const {userRoles: {ADMIN}} = require('../configs');

router.get(
    '/',
    userMiddleware.checkUserRole([ADMIN]),
    userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.isUserEmailExistMiddleware,
    userController.createUser);

router.put(
    '/',
    authMiddleware.checkAccessToken,
    fileMiddleware.checkUserAvatar,
    userController.addAvatar
);

router.delete(
    '/:user_id',
    userMiddleware.checkUserRole([ADMIN]),
    userMiddleware.checkUserIdMiddleware,
    authMiddleware.checkAccessToken,
    userController.deleteUser);

router.get(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserIdMiddleware,
    userController.getUserById);

router.put(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.updateUserMiddleware,
    userMiddleware.checkUserIdMiddleware,
    userController.updateUser);

module.exports = router;
