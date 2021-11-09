const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!'
    },
    [emailActionsEnum.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool!'
    },
    [emailActionsEnum.USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'oops'
    },
    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'Deleted'
    },
    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'Updated'
    },
    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Forgot password'
    },
    [emailActionsEnum.CHANGE_PASSWORD]: {
        templateName: 'change-password',
        subject: 'Change password'
    },
    [emailActionsEnum.COME_BACK]: {
        templateName: 'come-back.pug',
        subject: 'Come back'
    },
    [emailActionsEnum.APARTMENT_RESERVED]: {
        templateName: 'landlord-booking.pug',
        subject: 'Rent'
    },
    [emailActionsEnum.RESERVED]: {
        templateName: 'tenant-booking.pug',
        subject: 'Rent'
    },
    [emailActionsEnum.APPROVE_TO_RESERVE]: {
        templateName: 'approve-to-reserve',
        subject: 'Approve'
    },
    [emailActionsEnum.WAITING_FOR_CONFIRM]: {
        templateName: 'waiting-for-confirmation',
        subject: 'Confirm'
    }
};
