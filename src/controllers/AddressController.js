const output = require('../models/Output');
const Address = require('../models/Address');

/**
 * Insert an user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.insert = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0){
            throw new Error("Raw body is required");
        }
        let userAddressModel = new Address();
        let data = await userAddressModel.create(req.body);

        let msg = 'Inserted';
        let status = true;
        let statusCode = 200;
        if (!data.hasOwnProperty('dataValues')) {
             msg = 'Fail to Insert';
             status = false;
             statusCode = 400;
        }

        return output.responseJson(status, msg, res, statusCode);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Update an UserAddress
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    try {
        const userAddressModel = new Address();
        const id = req.params.id;

        await userAddressModel.update(req.body, id);

        return output.responseJson(true, 'Updated user', res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Remove an user Address to postgres
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const userAddressModel = new Address();
        await userAddressModel.delete(id);

        return output.responseJson(true, "Delete successfully.", res, 201);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};
