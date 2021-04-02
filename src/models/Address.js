const validator   = require('./Sequelize/Validator');

const entities = require('./Entities');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Address
{
    constructor() {
        this.validator = new validator();
        this.entityUserAddress = entities.userAddress;
        this.baseFields = [
            "type_name",
            "cep",
            "street",
            "number",
            "district",
            "city",
            "state"
        ];
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
            return await this.entityUserAddress.create(data);
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
    async findUserAddressById(id)
    {
        const data = await this.entityUserAddress.findAll({
            where: {
                id: id
            }
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

        return await this.entityUserAddress.update(data, {
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
        let response = await this.entityUserAddress.destroy({
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

module.exports = Address;