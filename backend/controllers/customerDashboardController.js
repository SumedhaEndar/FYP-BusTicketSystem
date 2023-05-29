const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')


// Update Customer Profile
const updateCustomer = (req, res) => {
    const { id } = req.params
    const {
        name,
        mobile,
        oldPassword,
        newPassword
    } = req.body

    if(oldPassword === ""){
        mysql_MBS.query(
            "UPDATE customers SET customer_name = ?, customer_contact = ? WHERE customer_id = ?",
            [name, mobile, id],
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
        mysql_MBS.query(
            "SELECT customer_password FROM customers WHERE customer_id = ?",
            [id],
            async (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error retreive the old password when updating customer' });
                }

                const hashedPassword = result[0].customer_password
                const isPasswordMatch = await comparePasswords(oldPassword, hashedPassword)

                if(isPasswordMatch) {
                    const hashedPassword = await hashPassword(newPassword)
                    mysql_MBS.query(
                        "UPDATE customers SET customer_name = ?, customer_contact = ?, customer_password = ? WHERE customer_id = ?",
                        [name, mobile, hashedPassword, id],
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
    updateCustomer
}