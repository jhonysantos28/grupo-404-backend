class Output{
    static responseJson(success, data, res, status){
        res.type('json');
        res.status(status).json({"success": success, "body": data, "status": status});

        return res;
    }

    static responseError(error, res, status){
        res.type('json');
        res.status(status).json({"success": false, "error": {
            "status": status,
            "message": error.message
        }});

        return res;
    }
}

module.exports = Output;