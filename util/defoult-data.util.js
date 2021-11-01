const {User} = require('../dataBase');
const {userRoles} = require('../configs');

module.exports = async () => {
    const user = await User.findOne({role: userRoles.ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'User',
            email: 'user.admin@site.com',
            password: 'User2021!',
            role: userRoles.ADMIN
        });
    }
};
