const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')


/*------------------------------- Admin Dash Employee --------------------------------------*/
const addEmployee = async(req, res) => {
    const {
        name,
        email,
        mobile, 
    } = req.body

    const defaultPassword = "Sumedha_12345"

    try {
        // Check if email already existed in the database
        mysql_MBS.query(
            "SELECT * FROM employees WHERE employee_email = ?",
            [email],
            async(err, result) => {
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
                const hashedPassword = await hashPassword(defaultPassword)

                 // New email address, store it to the database
                mysql_MBS.query(
                    "INSERT INTO employees (employee_name, employee_email, employee_contact, employee_password) VALUES (?,?,?,?)",
                    [name, email, mobile, hashedPassword],
                    (err, result)=>{
                        if(err){
                            res.status(500).json({message: 'Error adding an employee'});
                            return
                        }
                        res.status(200).json({
                            employee_id: result.insertId,
                            employee_name: name, 
                            employee_email: email,
                            employee_contact: mobile
                        })
                    }
                )
            }
        )
    }
    catch(error) {
        res.status(500).json({message: 'Error adding an employee'});
    }
}

const getEmployees = (req, res) => {
    mysql_MBS.query(
        "SELECT * FROM employees",
        (err, results) => {
            if(err){
                res.status(500).json({message: 'Error retrieving data from table'})
                return
            }
            res.json({results})
        }
    )
}

const deleteEmployee = (req, res) => {
    const { id } = req.params

    mysql_MBS.query(
        'DELETE FROM employees WHERE employee_id = ?',
        [id],
        (err, result) => {
            if(err){
                res.status(500).json({message: 'Error deleting an employee'});
                return;
            }

            res.status(200).json(id)
        }
    )
}
/*-----------------------------------------------------------------------------------------*/


/*------------------------------- Admin Dash Profile --------------------------------------*/
const getEmployeeProfile = (req, res) => {
    const id = req.user_id
    console.log(id)
    mysql_MBS.query(
        "SELECT * FROM employees WHERE employee_id = ?",
        [id],
        (err, result)=>{
            if(err) {
                res.status(500).json({message: 'Error ID'});
                return
            }
            res.status(200).json({
                name: result[0].employee_name,
                email: result[0].employee_email,
                mobile: result[0].employee_contact,
            });
        }
    )
}

const updateEmployeeProfile = (req, res) => {
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
            "UPDATE employees SET employee_name = ?, employee_email = ?, employee_contact = ? WHERE employee_id = ?",
            [name, email, mobile, id],
            (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error updating employee', err });
                }
                else {
                    res.status(200).json({message: "Employee Updating Successful"});
                }
            }
        )
    }

    else {
        mysql_MBS.query(
            "SELECT employee_password FROM employees WHERE employee_id = ?",
            [id],
            async (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error retreive the old password when updating employee' });
                    return
                }
    
                const hashedPassword = result[0].employee_password
                const isPasswordMatch = await comparePasswords(oldPassword, hashedPassword)
    
                if(isPasswordMatch) {
                    const hashedPassword = await hashPassword(newPassword)
                    mysql_MBS.query(
                        "UPDATE employees SET employee_name = ?, employee_email = ?, employee_contact = ?, employee_password = ? WHERE employee_id = ?",
                        [name, email, mobile, hashedPassword, id],
                        (err, result)=>{
                            if(err){
                                res.status(500).json({ error: 'Error updating employee' });
                            }
                            else {
                                res.status(200).json({ message: 'Employee updated successfully' });
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
/*-----------------------------------------------------------------------------------------*/


/*------------------------------- Admin Dash Feedback -------------------------------------*/
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
/*-----------------------------------------------------------------------------------------*/


module.exports = {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeProfile,
    updateEmployeeProfile,
    getFeedback,
    deleteFeedback
}