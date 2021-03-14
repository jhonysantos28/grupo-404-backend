const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Filter
{
   constructor(data)
   {
      this.data = data;

      /**
       * Composite Functions Filter
       * 
       * add name fuctions
       */
      this.filtersCollection = [
         'filterName',
         'filterEmail',
         'filterCreatedAt',
         'filterUpdatedAt'
      ];

      this.filters = {};

      this.defaultLimit = 20;
      this.defaultPage  = 1;
      this.defaultSort  = 'desc'
   }

   /**
    * Return Limit results
    */
   getLimit() 
   {
      if (typeof this.data.limit === 'undefined' || !this.data.limit) {
         return this.defaultLimit;
      }

      return this.data.limit;
   }

   /**
    * Return Order collection
    */
   getSort()
   {
      if (typeof this.data.sort === 'undefined' || !this.data.sort) {
         return [
            ['id', this.defaultSort]
         ]
      }

      return [
         ['id', this.data.sort]
     ];
      
   }

   /**
    * Return current page
    */
   getPage()
   {
      if (typeof this.data.page === 'undefined' || !this.data.page) {
         return this.defaultPage;
      }

      return this.data.page;
   }

   /**
    * Return last page
    * 
    * @param {*} count 
    * @param {*} limit 
    */
   getLastPage(countData)
   {
      let value = (countData < this.getLimit()) ? 1 : countData / this.getLimit();

      return Math.ceil(value);
   }

   /**
    * Return criteria from ORM sequelize
    */
   getCriteria()
   {
      this.filtersCollection.forEach((value) => {
         // console.log(value);
         this[value]();
      });
     
      return this.filters;
   }

   /**
    * Filter name
    */
   filterName()
   {
      if (!this.hasParam('name')) {
         return this;
      }

      this.filters.name = {[Op.like]: '%' + this.data.name + '%'};
     
      return this;
   }

   /**
    * Filter Email
    */
   filterEmail()
   {
      if (!this.hasParam('email')) {
         return this;
      }

      this.filters.email = this.data.email;
     
      return this;
   }

   /**
    * Filter Between CreatedAt
    */
   filterCreatedAt()
   {
      if (!this.hasParam('createdAt')) {
         return this;
      }

      let createdAt = this.data.createdAt;
      
      this.data.createdAt =  createdAt.split(':');
      
      if (this.data.createdAt.length != 2) {
         return this;
      }

      let startDate =  this.data.createdAt[0],
            endDate   =  this.data.createdAt[1];

      this.filters.createdAt = {
         [Op.gt]: new Date(startDate),
         [Op.lt]: endDate + 'T23:59:00.000Z'
      }

      return this;
   }

   /**
    * Filter Between CreatedAt
    */
   filterUpdatedAt()
   {
      if (!this.hasParam('updatedAt')) {
         return this;
      }

      let updatedAt = this.data.updatedAt;
      
      this.data.updatedAt =  updatedAt.split(':');
      
      if (this.data.updatedAt.length != 2) {
         return this;
      }

      let startDate =  this.data.updatedAt[0],
            endDate   =  this.data.updatedAt[1];

      this.filters.updatedAt = {
         [Op.gt]: new Date(startDate),
         [Op.lt]: endDate + 'T23:59:00.000Z'
      }

      return this;
   }

   /**
    * check param exists
    * 
    * @param {*} value 
    */
   hasParam(value)
   {
      if (typeof this.data[value] === 'undefined' || !this.data[value]) {
         return false;
      }

      return true;
   }
}

module.exports = Filter;