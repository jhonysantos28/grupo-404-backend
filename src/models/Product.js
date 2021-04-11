const Response    = require('./Response');
const validator   = require('./Sequelize/Validator');
const filter      = require('./Sequelize/Filter');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Product
{
    constructor() {
        this.validator = new validator();
        this.entityProduct = entities.product;
        this.entityProductImage = entities.productImages;
        this.entityUser = entities.user;
        this.baseFields = [
            "description",
            "code",
            "active",
            "price",
            "qty"
        ];
    }

    /**
     * Return a Product Collection
     *
     * @param data
     * @returns {Promise<*>}
     */
    async getCollection(data)
    {
        const filterInstance = new filter(data);
        const response       = new Response();
        const criteria       = await filterInstance.getCriteria();

        const countData = await this.entityProduct.count({where: criteria});
        const bodyData = await this.entityProduct.findAll({
            attributes: {exclude: ['password']},
            where: criteria,
            include: this.entityProductImage,
            limit: filterInstance.getLimit(),
            order: filterInstance.getSort(),
            offset: (filterInstance.getPage() === 1) ? 0 : (filterInstance.getPage() - 1) * filterInstance.getLimit()
        });

        response.setHeader(countData, filterInstance);
        response.setItems(bodyData);

        return response.get();
    }

    /**
     * Create a register
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data)
    {
        let dataBody = data.body;

        let validatorContent = this.validator
            .setData(dataBody)
            .hasContent(this.baseFields);

        if (!validatorContent) {
            throw new Error(this.validator.error);
        }

        try {
            dataBody.productImages = data.files;

            return await this.entityProduct.create(dataBody,{include: [this.entityProductImage]});
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Find by id
     *
     * @param id
     * @returns {Promise<void>}
     */
    async findProductById(id)
    {
        const data = await this.entityProduct.findAll({
            where: {
                id: id
            },
            include: this.entityProductImage
        });

        if (data.length === 0) {
            throw new Error("Not found");
        }

        return data;
    }

    /**
     * Update a data
     *
     * @param data
     * @param id
     * @returns {Promise<*>}
     */
    async update(data, id)
    {
        if (!id) {
            throw new Error(this.validator.error);
        }

       return await this.entityProduct.update(data, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }

    /**
     * Remove an product in postgres
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id)
    {
        let response = await this.entityProduct.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        if (!response) {
            throw new Error("Unable to delete.");
        }

        return true;
    }
}

module.exports = Product;