select 
    EXTRACT(MONTH FROM "createdAt") as mes, 
    sum(total) as total
from sales_order 
where "createdAt" between '2021-01-01 00:00:00' and '2021-04-30 23:59:59' 
group by mes;