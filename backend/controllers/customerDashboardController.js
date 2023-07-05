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

// Get customer enrich points
const getEnrichPoints = (req, res)=>{
    const id = req.user_id
    // console.log(id)
    mysql_MBS.query(
        "SELECT * FROM customers WHERE customer_id = ?",
        [id],
        (err, result)=>{
            if(err){
                res.status(500).json({message: 'Error ID'});
                return
            }
            res.status(200).json(result[0])
        }
    )
}

// Add a booking
const addBooking = (req, res) => {
    const customerId = req.user_id;
    const { planId, bookingSeatNumbers, bookingCost, usedPointsTokens, addEnrichPoints } = req.body;
  
    const query = "INSERT INTO bookings (plan_id, customer_id, booking_seat, booking_cost) VALUES (?, ?, ?, ?)";
  
    let successfulBookings = 0;
    let totalBookings = bookingSeatNumbers.length;
  
    bookingSeatNumbers.forEach((seatNumber) => {
      const values = [planId, customerId, seatNumber, bookingCost];
  
      // Execute the query for each item in the array
      mysql_MBS.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully.');
          successfulBookings++;
        }
  
        // Check if all bookings have been processed
        if (successfulBookings === totalBookings) {
          if (usedPointsTokens.whichOne === 'Enrich') {
            mysql_MBS.query(
              `UPDATE customers SET customer_enrich = customer_enrich - ${usedPointsTokens.pointsUsed} + ${addEnrichPoints} WHERE customer_id = ${customerId}`,
              (err, results) => {
                if (err) {
                  console.error('Error:', err);
                  res.status(500).json({ message: 'An error occurred while updating the Enrich points.' });
                } else {
                  console.log('Enrich Points updated successfully.');
                  res.status(200).json({ message: 'All data inserted and Enrich points updated successfully.' });
                }
              }
            );
          } else if (usedPointsTokens.whichOne === 'Refund') {
            mysql_MBS.query(
              `UPDATE customers SET customer_refund = customer_refund - ${usedPointsTokens.tokensUsed}, customer_enrich = customer_enrich + ${addEnrichPoints} WHERE customer_id = ${customerId}`,
              (err, results) => {
                if (err) {
                  console.error('Error:', err);
                  res.status(500).json({ message: 'An error occurred while updating the refund tokens.' });
                } else {
                  console.log('Refund Tokens and Enrich Points updated successfully.');
                  res.status(200).json({ message: 'All data inserted and tokens updated successfully.' });
                }
              }
            );
          } else {
            mysql_MBS.query(
              `UPDATE customers SET customer_enrich = customer_enrich + ${addEnrichPoints} WHERE customer_id = ${customerId}`,
              (err, results) => {
                if (err) {
                  console.error('Error:', err);
                  res.status(500).json({ message: 'An error occurred while updating the Enrich points.' });
                } else {
                  console.log('Enrich Points updated successfully.');
                  res.status(200).json({ message: 'All data inserted and Enrich points updated successfully.' });
                }
              }
            );
          }
        }
      });
    });
};

module.exports = {
    getProfile,
    updateProfile,
    getEnrichPoints,
    addBooking
}