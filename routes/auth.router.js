const router = require('express')
    .Router();

const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {actionTokenTypeEnum, emailActionsEnum} = require('../configs');

router.post(
    '/',
    authMiddleware.isUserAuthValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordMatched,
    authController.login
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

router.post(
    '/logout-all',
    authMiddleware.checkAccessToken,
    authController.logoutAll
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/password/forgot',
    authMiddleware.isEmailValid,
    authController.sendMailForgotPassword(actionTokenTypeEnum.FORGOT_PASSWORD, emailActionsEnum.FORGOT_PASSWORD));

router.put(
    '/password/forgot',
    authMiddleware.isUserPassValid,
    authMiddleware.checkActionToken(actionTokenTypeEnum.FORGOT_PASSWORD),
    authController.setNewPasswordForgot);

router.post(
    '/password/change',
    authMiddleware.isEmailValid,
    authController.sendMailForgotPassword(actionTokenTypeEnum.CHANGE_PASSWORD, emailActionsEnum.CHANGE_PASSWORD));

router.put(
    '/password/change',
    authMiddleware.isUserPassValid,
    authMiddleware.checkActionToken(actionTokenTypeEnum.CHANGE_PASSWORD),
    authController.setNewPasswordForgot);

router.get(
    '/activate/:token',
    authMiddleware.checkActivateToken,
    authController.activate);

module.exports = router;
