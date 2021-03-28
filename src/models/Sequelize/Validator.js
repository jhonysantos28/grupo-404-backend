class Validator {
    constructor(data) {
        this.messageHasContent = " is required";
    }
     hasContent(fields) {
        let dataPost = this.data;
        let defaultMessage = this.messageHasContent;
        fields.forEach(value => {
            if (!dataPost[value]){
                throw new Error(value+defaultMessage);
            }
        });

        return true;
    }

    setData(data) {
        this.data = data;

        return this;
    }
}

module.exports = Validator;