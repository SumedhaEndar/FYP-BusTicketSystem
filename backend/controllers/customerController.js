const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')
const jwtCreateToken = require('../utilities/jwtCreateToken')


// Login Customer
const loginCustomer = async(req, res) => {
    const {
        email,
        password
    } = req.body

    mysql_MBS.query(
        "SELECT customer_id, customer_password, customer_name FROM customers WHERE customer_email = ?",
        [email],
        async (err, result) => {
            if(err) {
                res.status(500).json({error:"Error retrieving customer"})
                return
            }
            if(result.length === 0) {
                // customer with the provided email does not exist
                res.status(401).json({error:"Invalid email or password"})
                return
            }

            // This is the password that stored in the database
            const hashedPassword = result[0].customer_password

            // Compare the povided password with the hashed password
            const isPasswordMatch = await comparePasswords(password, hashedPassword)

            if(isPasswordMatch) {
                const token = jwtCreateToken(result[0].customer_id)
                // Passwords match, login successful
                res.status(200).json({
                    name: result[0].customer_name, 
                    email: email, 
                    role: "Customer",
                    // id: result[0].customer_id,
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


// Register Customer
const registerCustomer = async(req, res) => {
    const {
        name,
        email,
        mobile,
        password
    } = req.body

    try {
        // Check if email already exitsts in the database
        mysql_MBS.query(
            "SELECT * FROM customers WHERE customer_email = ?",
            [email],
            async (err, result) => {
                if(err) {
                    res.status(500).json({message: 'Error checking email'});
                    return
                }

                // If email exists, return an error response
                if(result.length > 0) {
                    res.status(400).json({message: 'Email already exists'})
                    return
                }

                // Hash the password
                const hashedPassword = await hashPassword(password)

                // New email address, store it to the database
                mysql_MBS.query(
                    "INSERT INTO customers (customer_name, customer_email, customer_contact, customer_password) VALUES (?,?,?,?)",
                    [name, email, mobile, hashedPassword],
                    (err, result)=>{
                        if(err){
                            res.status(500).json({message: 'Error registering customer'});
                            return
                        }
                       
                        // for postman api testing use
                        // const insertedData = {
                        //     customer_id: result.insertId,
                        //     customer_name,
                        //     customer_email,
                        //     customer_contact,
                        //     hashedPassword
                        // }
                        // res.status(200).json({data: insertedData});

                        // create a token
                        const id = result.insertId
                        const token = jwtCreateToken(id)

                        // res.status(200).json({customer_id, customer_email, token})
                        res.status(200).json({
                            name:name, 
                            email: email,
                            role: "Customer",
                            // id: result.insertId, 
                            token: token
                        })
                    }
                )
            }
        )
    }
    catch(error) {
        res.status(500).json({message: 'Error registering customer'});
    }
}


// Create Feedback
const createFeedback = (req, res) => {
    // Destructure data received from the request
    const {
        name,
        email,
        mobile,
        feedback,
        subject,
        message
    } = req.body

    // Perform mysql query to insert the data to the database
    mysql_MBS.query(
        "INSERT INTO feedback (feedback_name, feedback_email, feedback_mobile, feedback_type, feedback_subject, feedback_message) VALUES (?,?,?,?,?,?)",
        [name, email, mobile, feedback, subject, message],
        (err, result) => {
            if(err) {
                res.status(500).json({error: err.message});
            }
            else {
                // for postman api testing use
                // const insertedData = {
                //     feedback_id: result.insertId,
                //     feedback_name,
                //     feedback_email,
                //     feedback_mobile,
                //     feedback_type,
                //     feedback_subject,
                //     feedback_message
                // }
                // res.status(200).json({data: insertedData});
                res.status(200).json({message: "Successful"});
            }
        }
    )
}


// Get Feedback
const getFeedback = (req, res) => {
    const page = parseInt(req.query.page) || 1  
    const limit = 1
    const offset = (page - 1)*limit

    // Execute first query
    mysql_MBS.query(
        "SELECT COUNT(*) as total_count FROM feedback",
        (err, countResult) => {
            if(err) {
                throw err
            }

            const totalCount = countResult[0].total_count
    
            // Execute second query
            mysql_MBS.query(
                "SELECT * FROM feedback LIMIT ? OFFSET ?",
                [limit, offset],
                (err, dataResult) => {
                    if(err){
                        throw err
                    }
                    
                    const response = {
                        currentPage: page,
                        totalPages: Math.ceil(totalCount/limit),
                        totalCount: totalCount,
                        items: dataResult
                    }

                    res.status(200).json(response)
                }
            )
        }
    )
}


// Delete Feedback
const deleteFeedback = (req, res) => {
    const { id } = req.params

    mysql_MBS.query(
        'DELETE FROM feedback WHERE feedback_id = ?',
        [id],
        (err, result) => {
            if(err){
                res.status(500).json({message: 'Error deleting feedback'});
                return;
            }

            res.status(200).json(result)
        }
    )
}


module.exports = {
    registerCustomer,
    loginCustomer,
    createFeedback,
    getFeedback,
    deleteFeedback
}