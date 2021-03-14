
class Validator {

    constructor() {
        this.error;
    }

    validate(data) {

        if (!this.validateEmail(data)) {
            return false
        }
        if (!this.validateRequestBase(data)) {
            return false
        }

        return true;
    }

    validateEmail(data) {
       
        if (!data.email) {
            this.error = "Email is required.";
            return false;
        }

        if (data.email.length > 100) {
            this.error = "Email oversized.";
            return false;
        }

        const validateEmail = new RegExp(/\S{1,50}@\S{1,50}\.\S+/);

        if (!validateEmail.test(data.email)) {
            this.error = "Email is not valid.";
            return false;
        }
       
        return true;
    }

    async validateRequestUpdate(data, id) {
        if (!id){
            this.error = "Required param (ID)";
            return false;
        }

        await this.validateRequestBase(data);

        return true;
    }

    async validateRequestBase (data) {

        if (!data){
            this.error = "Raw body is required";
            return false;
        }

        if (!data.email){
            this.error = "Email is required";
            return false;
        }

        if (!data.name){
            this.error = "Name is required";
            return false;
        }

        if (!data.phone){
            this.error = "Phone is required";
            return false;
        }
    }
}

module.exports = Validator;