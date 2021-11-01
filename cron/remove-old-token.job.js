const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {O_Auth} = require('../dataBase');

dayJs.extend(utc);

module.exports = async () => {
    const previousMonth = dayJs.utc()
        .subtract(1, 'month');

    const deleteInfo = await O_Auth.deleteMany({
        createdAt: {$lt: previousMonth}
    });
    console.log(deleteInfo);
};
