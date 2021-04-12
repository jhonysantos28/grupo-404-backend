const output = require('../models/Output');
const product = require('../models/Product');

/**
 * Return an product collection
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getCollection = async (req, res) => {
    try {        
        const productModel = new product();
        const data = await productModel.getCollection(req.query);
        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Insert an product
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.insertProduct = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0){
            throw new Error("Raw body is required");
        }
        const productModel = new product();
        const data = await productModel.create(req);

        let msg = 'Insert product';
        let status = true;
        let statusCode = 200;

        if (!data.hasOwnProperty('dataValues')) {
             msg = 'Fail to Insert product';
             status = false;
             statusCode = 400;
        }

        return output.responseJson(status, msg, res, statusCode);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Get an product detail
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getProduct = async (req, res) => {
    let id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const productModel = new product();
        const data = await productModel.findProductById(id);

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
exports.updateProduct = async (req, res) => {
    try {
        const productModel = new product();
        const id = req.params.id;
        await productModel.update(req.body, id);

        return output.responseJson(true, 'Updated product', res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

/**
 * Remove an product to postgres
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id){
            throw new Error("Required param (ID)");
        }
        const productModel = new product();
        await productModel.delete(id);

        return output.responseJson(true, "Delete successfully.", res, 201);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};
