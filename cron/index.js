const cron = require('node-cron');

const removeOldTokens = require('./remove-old-token.job');
const sendMailtoUsers = require('./send-mail-token.job');

module.exports = () => {
    cron.schedule('0 0 * */1 *', async () => {
        await removeOldTokens();
    });
    cron.schedule('0 0 */10 * * *', async () => {
        await sendMailtoUsers();
    });
};
