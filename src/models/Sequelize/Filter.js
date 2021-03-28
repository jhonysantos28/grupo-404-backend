const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Filter {
    constructor(data) {
        this.filters = {};
        this.data = data;
        this.defaultLimit = 20;
        this.defaultPage  = 1;
        this.defaultSort  = 'desc';
    }

    /**
     * Return Limit results
     */
    getLimit() {
        if (typeof this.data.limit === 'undefined' || !this.data.limit) {
            return this.defaultLimit;
        }

        return this.data.limit;
    }

    /**
     * Return current page
     */
    getPage() {
        if (typeof this.data.page === 'undefined' || !this.data.page) {
            return this.defaultPage;
        }

        return this.data.page;
    }

    /**
     * Return last page
     *
     * @param countData
     */
    getLastPage(countData) {
        const value = (countData < this.getLimit()) ? 1 : countData / this.getLimit();

        return Math.ceil(value);
    }


    /**
     * Return Order collection
     */
    getSort() {
        if (typeof this.data.sort === 'undefined' || !this.data.sort) {
            return [
                ['id', this.defaultSort]
            ];
        }

        return [
            ['id', this.data.sort]
        ];

    }

    /**
     * Generate a filter
     *
     * @returns {Promise<{offset: number, limit: *, order: *}>}
     */
    async filterGenerate() {
        const criteria = await this.getCriteria();
        const filterGenerate  =  {
            limit: this.getLimit(),
            order: this.getSort(),
            offset: (this.getPage() === 1) ? 0 : (this.getPage() - 1) * this.getLimit()
        };

        if (criteria.length !== 0) {
            filterGenerate.where = {
                [Op.and]: criteria
            };
        }

        return filterGenerate;
    }

    /**
     * Generate a criteria to filter
     *
     * @returns {Promise<Array>}
     */
    async getCriteria() {
        return Object.keys(this.data).reduce((filter = [], key) => {
            if (key !== 'page' && key !== 'limit') {
                const obj = {};
                obj[key] = Array.isArray(this.data[key]) ? { [Op.in]: this.data[key] } : { [Op.substring] : this.data[key]};
                filter.push(obj);
            }
            return filter;
        }, []);
    }
}

module.exports = Filter;