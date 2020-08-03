var jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    var token = req.headers.token
    jwt.verify(token, "calwin123", async (err, decode) => {
        if (err) {
            res.status(403).send({
                message: "Invalid token"
            }) 
        }
        else {
            req.user = decode.id
            next() 
        }
    })
}