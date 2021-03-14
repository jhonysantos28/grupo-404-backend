class Validator {
    constructor(data) {
        this.data = data;
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
    }
}

module.exports = Validator;