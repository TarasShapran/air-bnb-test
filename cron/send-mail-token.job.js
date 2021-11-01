const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {O_Auth} = require('../dataBase');
const {emailService} = require('../service');
const {emailActionsEnum} = require('../configs');

dayJs.extend(utc);

module.exports = async () => {
    const loginTenDaysAgo = dayJs.utc()
        .subtract(10, 'day');

    const users = await O_Auth.find({updatedAt: {$lt: loginTenDaysAgo}});

    if (users.length) {
        const usersToRemind = [];

        users.forEach(user => usersToRemind.push(user.user_id));

        await Promise.allSettled(usersToRemind.map(user => emailService.sendMail(user.email, emailActionsEnum.COME_BACK)));
    }


};
