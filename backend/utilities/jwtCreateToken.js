const jwt = require('jsonwebtoken')

const jwtCreateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '3d'})
}

module.exports = jwtCreateToken