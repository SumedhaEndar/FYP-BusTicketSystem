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

// Add Bookings
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


// Get Bookings
const getBooking = (req, res) => {
  const customerId = req.user_id;

  const query = `
    SELECT 
      bookings.booking_id,
      bookings.booking_seat,
      plans.plan_price,
      plans.plan_date,
      plans.plan_origin,
      plans.plan_destination,
      plans.plan_time,
      partners.partner_logoImg,
      partners.partner_name,
      partners.partner_id
    FROM
      bookings
      INNER JOIN plans ON bookings.plan_id = plans.plan_id
      INNER JOIN partners ON plans.partner_id = partners.partner_id
    WHERE
      bookings.customer_id = ?
  `;

  mysql_MBS.query(query, [customerId], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } 
    else {
      res.status(200).json({ bookings: results });
    }
  });
}

// Delete Bookings
const deleteBooking = (req, res) => {
  const customerId = req.user_id;
  const { id } = req.params;
  const { refundValue } = req.body;

  // Begin the transaction
  mysql_MBS.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      res.status(500).json({ message: 'Error beginning transaction' });
      return;
    }

    // Update operation
    mysql_MBS.query(
      'UPDATE customers SET customer_refund = customer_refund+? WHERE customer_id = ?',
      [refundValue, customerId],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error updating table1:', updateErr);
          mysql_MBS.rollback(() => {
            res.status(500).json({ message: 'Error updating table1' });
          });
          return;
        }

        // Delete operation
        mysql_MBS.query(
          'DELETE FROM bookings WHERE booking_id = ?',
          [id],
          (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error('Error deleting from table2:', deleteErr);
              mysql_MBS.rollback(() => {
                res.status(500).json({ message: 'Error deleting from table2' });
              });
              return;
            }

            // Commit the transaction
            mysql_MBS.commit((commitErr) => {
              if (commitErr) {
                console.error('Error committing transaction:', commitErr);
                mysql_MBS.rollback(() => {
                  res.status(500).json({ message: 'Error committing transaction' });
                });
                return;
              }

              // Transaction successfully completed
              res.status(200).json({ message: 'Update and delete completed successfully' });
            });
          }
        );
      }
    );
  });
};

// Get a single booking
const getOneBooking = (req, res) => {
  const { booking_id } = req.params;

  const query = `
    SELECT bookings.booking_seat, plans.plan_date, plans.plan_origin, plans.plan_destination, plans.plan_time, partners.partner_name
    FROM bookings
    INNER JOIN plans ON bookings.plan_id = plans.plan_id
    INNER JOIN partners ON plans.partner_id = partners.partner_id
    WHERE bookings.booking_id = ?
  `;

  mysql_MBS.query(query, [booking_id], (error, results) => {
    if (error) {
      console.error('Error retrieving booking details:', error);
      res.status(500).json({ error: 'Error retrieving booking details' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        const bookingDetails = results[0];
        res.status(200).json(bookingDetails);
      }
    }
  });
}

module.exports = {
    getProfile,
    updateProfile,
    getEnrichPoints,
    addBooking,
    getBooking,
    getOneBooking,
    deleteBooking
}