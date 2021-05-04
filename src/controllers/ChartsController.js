const output = require('../models/Output');
const { QueryTypes } = require('sequelize');
const db = require('../models/Entities/index');

/**
 * Return an six months sales data
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getSixMonthSales = async (req, res) => {
    try {        
        
        

        /**
         * TODO: Colocar em model depois
         */
        db.Sequelize.query
        const janeiro = await db.sequelize.query(`
            select 
                'janeiro' as mes, 
                coalesce(sum(total), 0) as total 
            from sales_order
            where "createdAt" between '2021-01-01 00:00:00' and '2021-01-31 23:59:59'
        `, { type: QueryTypes.SELECT });

        console.log(janeiro);

        const data = {
            meses: [
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
            ],
            data: [234.33, 113.33, 678.33, 567.33, 123.55, 33.86]
        }

        return output.responseJson(true, data, res, 200);
    } catch (err) {
        return output.responseError(err, res, 400);
    }
};

function getLastDayDate(date) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
}