const Response = require('./Response');
const validator = require('./Sequelize/Validator');
const filter = require('./Sequelize/Filter');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SalesOrder {
    constructor() {
        this.validator = new validator();
        this.entityUser = entities.user;
        this.entityStatus = entities.status;
        this.entityProduct = entities.product;
        this.entitySalesOrder = entities.salesOrder;
        this.entitySalesOrderProducts = entities.salesOrderProducts;
        this.baseFields = [
            "user_id",
            "user_id_seller",
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
    async getCollection(data) {
        const filterInstance = new filter(data);
        const response = new Response();
        const criteria = await filterInstance.getCriteria();

        const countData = await this.entitySalesOrder.count({where: criteria});
        const bodyData = await this.entitySalesOrder.findAll({
            where: criteria,
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'status_id',
                    'user_id_seller'
                ]
            },
            include: [
                {
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: this.entityStatus
                },
                {
                    attributes: {
                        exclude: [
                            'order_id',
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    model: this.entitySalesOrderProducts,
                    as: 'products'
                },
                {
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt',
                            'password'
                        ]
                    },
                    model: this.entityUser,
                    as: 'user_seller'
                },
            ],

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
    async create(data) {
        let validatorContent = this.validator
            .setData(data)
            .hasContent(this.baseFields);

        if (!validatorContent) {
            throw new Error(this.validator.error);
        }

        try {

            return await this.entitySalesOrder.create(data, {
                include: [{
                    model: this.entitySalesOrderProducts,
                    as: 'products'
                }]
            });
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
    async findById(id) {
        const data = await this.entitySalesOrder.findAll({
            where: {
                id: id
            },
            include: [{
                attributes: {exclude: ['order_id']},
                model: this.entitySalesOrderProducts,
                as: 'products'
            }],
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

        let dataValues = {
            status_id: data.status_id,
            user_address_id: data.user_address_id
        };

        return await this.entitySalesOrder.update(dataValues, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }

    /**
     * Get User Orders
     *
     * @param id
     * @returns {Promise<void>}
     */
    async getUserOrders(id) {
        const data = await this.entitySalesOrder.findAll({
            where: {
                user_id: id
            },
            include: [{
                attributes: {exclude: ['order_id', 'createdAt', 'updatedAt']},
                model: this.entitySalesOrderProducts,
                as: 'products',
                include: [{
                    attributes: {exclude: ['id', 'qty', 'createdAt', 'updatedAt']},
                    model:this.entityProduct
                }]
            }],
        });

        if (data.length === 0) {
            throw new Error("Not found");
        }

        return data;
    }
}

module.exports = SalesOrder;