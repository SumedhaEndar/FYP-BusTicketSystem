const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')

const getProfile = (req, res) => {
    
}


module.exports = {
    getProfile,
}