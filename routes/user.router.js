const router = require('express')
    .Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares');
const {userRoles: {ADMIN,MANAGER}} = require('../configs');

router.get(
    '/',
    authMiddleware.checkAccessToken,
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
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([ADMIN]),
    userMiddleware.checkUserIdMiddleware,
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

router.post(
    '/:user_id/block',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([
        ADMIN,
        MANAGER
    ]),
    userMiddleware.checkUserIdMiddleware,
    userController.blockUser);

router.post(
    '/:user_id/unblock',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([
        ADMIN,
        MANAGER
    ]),
    userMiddleware.checkUserIdMiddleware,
    userController.unblockUser);

module.exports = router;
