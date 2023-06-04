const mysql_MBS =  require('../database/database')
const {
    // hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')
const jwtCreateToken = require('../utilities/jwtCreateToken')


// Login Admin
const loginAdmin = async(req, res) => {
    const {
        email,
        password
    } = req.body

    mysql_MBS.query(
        "SELECT employee_id, employee_password, employee_name FROM employees WHERE employee_email = ?",
        [email],
        async (err, result) => {
            if(err) {
                res.status(500).json({error:"Error retrieving employee"})
                return
            }
            if(result.length === 0) {
                // customer with the provided email does not exist
                res.status(401).json({error:"Invalid email or password"})
                return
            }

            // This is the password that stored in the database
            const hashedPassword = result[0].employee_password

            // Compare the povided password with the hashed password
            const isPasswordMatch = await comparePasswords(password, hashedPassword)

            if(isPasswordMatch) {
                const token = jwtCreateToken(result[0].employee_id)
                // Passwords match, login successful
                res.status(200).json({
                    name: result[0].employee_name, 
                    email: email,
                    role: "Admin", 
                    token: token
                })
            }
            else {
                // Passwords do not match
                res.status(401).json({ error: 'Invalid email or password' });
            }
        }
    )
}


module.exports = {
    loginAdmin
}