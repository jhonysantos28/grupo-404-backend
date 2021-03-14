exports.healthcheck = async (req, res) => {
    res.type ('json');
    res.header ('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.status(200).json({"status": 200, "message": "Auth OK"});
};