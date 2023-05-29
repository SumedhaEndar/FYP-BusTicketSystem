const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    
    //verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization Token Required'})
    }

    // 'Bearer blahblahblahblahblahblahblahblah'
    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET)
        req.user = id
        // console.log(id)
        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth

