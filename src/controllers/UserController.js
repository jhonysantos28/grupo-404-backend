const output = require('../models/Output');
const user = require('../models/User');
const login = require('../models/Login');
/**
 * Request to create a login user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
    try {
        let requestEmail = req.body.email;
        let requestPassword = req.body.password;

        if (!requestEmail || !requestPassword){
            throw new Error("Required params (email, password)");
        }

        const loginModel = new login();
        const data = await loginModel.checkCredential(requestEmail, requestPassword);

        res.type('json');

        return res.json(data);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Return an user collection
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getCollection = async (req, res) => {
    try {        
        const userModel = new user();
        const data = await userModel.getCollection(req.query);
        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Insert an user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.insertUser = async (req, res) => {    
    try {
        if (Object.keys(req.body).length === 0){
            throw new Error("Raw body is required");
        }
        const userModel = new user();
        let data = await userModel.create(req.body);

        let msg = 'Insert user';
        let status = true;
        let statusCode = 200;
        if (!data.hasOwnProperty('dataValues')) {
             msg = 'Fail to Insert user';
             status = false;
             statusCode = 400;
        }

        return output.responseJson(status, msg, res, statusCode);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Get an user detail
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUser = async (req, res) => {
    let id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const userModel = new user();
        const data = await userModel.findUserById(id);

        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Update an User
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateUser = async (req, res) => {
    try {
        const userModel = new user();
        const id = req.params.id;
        await userModel.update(req.body, id);

        return output.responseJson(true, 'Updated user', res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Remove an user to postgres
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const userModel = new user();
        await userModel.delete(id);

        return output.responseJson(true, "Delete successfully.", res, 201);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};
