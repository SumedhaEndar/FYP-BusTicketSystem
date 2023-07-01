const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')


// Get a Customer Profile
const getProfile = (req, res) => {
    const id = req.user_id
    console.log(id)
    mysql_MBS.query(
        "SELECT * FROM customers WHERE customer_id = ?",
        [id],
        (err, result)=>{
            if(err) {
                res.status(500).json({message: 'Error ID'});
                return
            }
            res.status(200).json({
                name: result[0].customer_name,
                email: result[0].customer_email,
                mobile: result[0].customer_contact,
            });

        }
    )
}

// Update Customer Profile
const updateProfile = (req, res) => {
    const id  = req.user_id
    const {
        name,
        email,
        mobile,
        oldPassword,
        newPassword
    } = req.body

    if(oldPassword === ""){
        mysql_MBS.query(
            "UPDATE customers SET customer_name = ?, customer_email = ?, customer_contact = ? WHERE customer_id = ?",
            [name, email, mobile, id],
            (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error updating customer', err });
                }
                else {
                    res.status(200).json({message: "Customer Updating Successful"});
                }
            }
        )
    }

    else {
        mysql_MBS.query(
            "SELECT customer_password FROM customers WHERE customer_id = ?",
            [id],
            async (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error retreive the old password when updating customer' });
                    return
                }
    
                const hashedPassword = result[0].customer_password
                const isPasswordMatch = await comparePasswords(oldPassword, hashedPassword)
    
                if(isPasswordMatch) {
                    const hashedPassword = await hashPassword(newPassword)
                    mysql_MBS.query(
                        "UPDATE customers SET customer_name = ?, customer_email = ?, customer_contact = ?, customer_password = ? WHERE customer_id = ?",
                        [name, email, mobile, hashedPassword, id],
                        (err, result)=>{
                            if(err){
                                res.status(500).json({ error: 'Error updating customer' });
                            }
                            else {
                                res.status(200).json({ message: 'Customer updated successfully' });
                            }
                        }
                    )
                }
                else {
                    // Passwords do not match
                    res.status(401).json({ error: 'Invalid password' });
                }
            }
        )
    }
   
}

module.exports = {
    getProfile,
    updateProfile
}