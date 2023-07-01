const mysql_MBS = require('../database/database')
const {
    comparePasswords
} = require('../utilities/bcryptHash')
const jwtCreateToken = require('../utilities/jwtCreateToken')


// Register Partner
const registerPartner = (req,res) => {
    const {
        name,
        email,
        contact,
        address
    } = req.body

    mysql_MBS.query(
        "INSERT INTO partnersregistration (partner_name, partner_email, partner_contact, partner_address) VALUES (?,?,?,?)",
        [name, email, contact, address],
        (err, result)=> {
            if(err){
                res.status(500).json({error: 'Failed to register'})
            }
            else {
                res.status(200).json({message: "Successful"})
            }
        }
    )
}

// Login Partner
const loginPartner = async(req, res) =>{
    const {
        email,
        password
    } = req.body

    mysql_MBS.query(
        'SELECT partner_id, partner_password, partner_name FROM partners WHERE partner_email = ?',
        [email],
        async (err, result) => {
            if(err){
                res.status(500).json({error:"Error retrieving partner"})
                return
            }
            if(result.length === 0){
                // customer with the provided email does not exist
                res.status(401).json({error:"Invalid email or password"})
                return
            }

            // This is the password that stored in the database
            const hashedPassword = result[0].partner_password

            // Compare the povided password with the hashed password
            const isPasswordMatch = await comparePasswords(password, hashedPassword)

            if(isPasswordMatch) {
                const token = jwtCreateToken(result[0].partner_id)
                // Passwords match, login successful
                res.status(200).json({
                    name: result[0].partner_name, 
                    email: email, 
                    role: "Partner",
                    // id: result[0].partner_id,
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
    registerPartner,
    loginPartner
}