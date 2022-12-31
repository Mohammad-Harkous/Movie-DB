const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // here we check if json web token exists and is verified
    if(token){
        jwt.verify(token, process.env.APP_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.status(404).json({error: 'invalid token'})
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.status(404).json({error: 'invalid token'}) 
    }
}

module.exports = { requireAuth };