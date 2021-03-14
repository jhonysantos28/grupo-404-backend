class Response
{
    constructor() {
        this.response = {}
    }

    /**
     * 
     * @param {String} data 
     */
    setItems(data) {
        this.response.items = data;

        return this;
    }

    /**
     * 
     * @param {*} data 
     */
    setHeader(countData, filterInstance)
    {
        this.setTotal(countData);
        this.setLimit(filterInstance.getLimit());
        this.setPage(filterInstance.getPage());
        this.setLastPage(filterInstance.getLastPage(countData));

        let perPage = (countData == this.response.lastPage) ? (countData % filterInstance.getLimit()) : Math.floor(this.response.lastPage);
        
        perPage = (this.response.lastPage == 1) ? countData : perPage;

        this.setPerPage(perPage);
    }

    /**
     * 
     * @param {Int} code 
     */
    setStatusCode(code) {
        this.response.statusCode = code;

        return this;
    }

    /**
     * 
     * @param {Int} value 
     */
    setTotal(value) {
        this.response.total = value;

        return this;
    }

    /**
     * 
     * @param {Int} value 
     */
    setLimit(value) {
        this.response.limit = value;

        return this;
    }

    /**
     * 
     * @param {Int} value 
     */
    setPage(value) {
        this.response.page = value;

        return this;
    }

    /**
     * 
     * @param {Int} value 
     */
    setPerPage(value) {
        this.response.perPage = value;

        return this;
    }

    /**
     * 
     * @param {Int} value 
     */
    setLastPage(value) {
        this.response.lastPage = value;
        return this;
    }

    /**
     * 
     */
    get() {
        return this.response;
    }
}

module.exports = Response;