const output = require('../models/Output');
const salesOrder = require('../models/SalesOrder');

/**
 * Return an salesOrder collection
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getCollection = async (req, res) => {
    try {        
        const salesOrderModel = new salesOrder();
        const data = await salesOrderModel.getCollection(req.query);
        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Insert an salesOrder
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
        const salesOrderModel = new salesOrder();
        let data = await salesOrderModel.create(req.body);

        let msg = 'Insert salesOrder';
        let status = true;
        let statusCode = 200;
        if (!data.hasOwnProperty('dataValues')) {
             msg = 'Fail to Insert salesOrder';
             status = false;
             statusCode = 400;
        }

        return output.responseJson(status, msg, res, statusCode);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Get an salesOrder detail
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const salesOrderModel = new salesOrder();
        const data = await salesOrderModel.findProductById(id);

        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Update an Product
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateStatus = async (req, res) => {
    try {
        const salesOrderModel = new salesOrder();
        const id = req.params.id;
        await salesOrderModel.update(req.body, id);

        return output.responseJson(true, 'Updated salesOrder', res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};
