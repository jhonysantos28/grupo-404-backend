const Response    = require('./Response');
const validator   = require('./User/Validator');
const filter      = require('./User/Filter');
const bcrypt      = require('bcrypt');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class User
{
    constructor() {
        this.validator = new validator();
        this.entityUser = entities.user;
        this.product = entities.product;
        this.productImages = entities.productImages;
    }

    /**
     * Return a User Collection
     *
     * @param data
     * @returns {Promise<*>}
     */
    async getCollection(data)
    {
        const filterInstance = new filter(data);
        const response       = new Response();
        const criteria       = await filterInstance.getCriteria();

        const countData = await this.entityUser.count({where: criteria});
        const bodyData = await this.entityUser.findAll({
            attributes: {
             exclude: [
                'password',
                'createdAt',
                'updatedAt'
             ]
            },
            where: criteria,
            limit: filterInstance.getLimit(),
            order: filterInstance.getSort(),
            include: [{
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt'
                    ],
                },
                model: this.product,
                include: [{
                    model: this.productImages
                }]
            }],
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
        let salt = bcrypt.genSaltSync(10);

        if (!this.validator.validate(data) || !data.password) {
            throw new Error(this.validator.error);
        }

        try {
            const valuesUser = {
                "name": data.name,
                "email": data.email,
                "phone": data.phone,
                "login": data.login,
                "password": bcrypt.hashSync(data.password, salt),
                "enabled": true
            };

            return await this.entityUser.create(valuesUser);
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
    async findUserById(id)
    {
        const data = await this.entityUser.findAll({
            where: {
                id: id
            },
            raw: true
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

       return await this.entityUser.update(data, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }

    /**
     * Remove an user in postgres
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id)
    {
        let response = await this.entityUser.destroy({
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

module.exports = User;