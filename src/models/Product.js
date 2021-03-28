const Response    = require('./Response');
const validator   = require('./Sequelize/Validator');
const filter      = require('./Sequelize/Filter');
const bcrypt      = require('bcrypt');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Product
{
    constructor() {
        this.validator = new validator();
        this.entityProduct = entities.product;
        this.entityProductImage = entities.productImages;
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
        let validatorContent = this.validator
            .setData(data)
            .hasContent([
                "name",
                "description",
                "code",
                "active",
                "price",
                "qty",
                "product_images"
            ]);

        if (!validatorContent) {
            throw new Error(this.validator.error);
        }

        try {
            const valuesProduct = {
                "name": data.name,
                "description": data.description,
                "code": data.code,
                "active": data.active,
                "price": data.price,
                "slug_url": data.slug_url,
                "sku": data.sku,
                "qty": data.qty,
                "productImages": data.product_images
            };

            return await this.entityProduct.create(valuesProduct,{include: [entities.productImages]});
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
            include: entities.productImages
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
        if (!await this.validator.validateRequestUpdate(data, id)) {
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