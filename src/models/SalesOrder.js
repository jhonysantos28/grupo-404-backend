const Response    = require('./Response');
const validator   = require('./Sequelize/Validator');
const filter      = require('./Sequelize/Filter');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SalesOrder
{
    constructor() {
        this.validator = new validator();
        this.entityProduct = entities.product;
        this.entityUser = entities.user;
        this.entitySalesOrder = entities.salesOrder;
        this.entitySalesOrderProducts = entities.salesOrderProducts;
        this.baseFields = [
            "user_id",
            "status_id",
            "user_address_id"
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

        const countData = await this.entitySalesOrder.count({where: criteria});
        const bodyData = await this.entitySalesOrder.findAll({
            where: criteria,
            include: [{
                attributes: {exclude: ['order_id']},
                model: this.entitySalesOrderProducts,
                as: 'products'
            }],
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
            .hasContent(this.baseFields);

        if (!validatorContent) {
            throw new Error(this.validator.error);
        }

        try {

            return await this.entitySalesOrder.create(data,{include: [{
                    model: this.entitySalesOrderProducts,
                    as: 'products'
                }]
            });
        } catch (e) {
            return e.message;
        }
    }
}

module.exports = SalesOrder;