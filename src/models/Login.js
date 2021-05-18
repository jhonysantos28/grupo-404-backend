const entities    = require('./Entities');
const bcrypt      = require('bcrypt');
const jwt = require('jsonwebtoken');

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

            let dataReturn = {};
            dataReturn.login = await bcrypt.compare(requestPassword, userDataBase.password);

            if(dataReturn.login) {
                dataReturn.id = userDataBase.id;
                dataReturn.email = userDataBase.email;
                dataReturn.name = userDataBase.name;
                dataReturn.token = jwt.sign({id:dataReturn.id}, process.env.SECRET, {
                    expiresIn: '60 days'
                });
            }

            return dataReturn;
        } catch (e) {
            return e.message;
        }
    }
}

module.exports = Login;