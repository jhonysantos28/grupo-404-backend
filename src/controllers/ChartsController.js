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
        const mesesLabel = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ];
        
        /**
         * TODO: Colocar em model depois
         */
        const totalVendas = await db.sequelize.query(`
            select 
                EXTRACT(MONTH FROM "createdAt") as mes, 
                sum(total) as total
            from sales_order 
            where "createdAt" between now() - interval '5 month' and now() 
            group by mes
        `, { type: QueryTypes.SELECT });

        const mesesValue = totalVendas.map(row => {
            return mesesLabel[row.mes - 1];
        });

        const dataPrice = totalVendas.map(row => {
            return row.total;
        });

        const data = {
            meses: mesesValue,
            data: dataPrice
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