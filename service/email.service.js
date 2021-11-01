const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const allTemplates = require('../email-templates');
const {constants,config} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler('Wrong template name',constants.METHOD_NOT_ALLOWED);
    }
    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
