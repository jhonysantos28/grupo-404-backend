const entities    = require('./Entities');
const bcrypt      = require('bcrypt');

class Login
{
    constructor() {
        this.entityUser = entities.user;
        this.bcrypt = bcrypt;
    }

    /**
     * Check a login credentials
     *
     * @param requestEmail
     * @param requestPassword
     *
     * @returns {Promise<*>}
     */
    async checkCredential(requestEmail, requestPassword)
    {
        try {
            let userDataBase = await this.entityUser.findOne({
                where: {
                    email: requestEmail
                },
                raw: true
            });

            return {
                "login" : await bcrypt.compare(requestPassword, userDataBase.password)
            }
        } catch (e) {
            return e.message;
        }
    }
}

module.exports = Login;