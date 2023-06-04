const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    // comparePasswords
} = require('../utilities/bcryptHash')


// Add an employee
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

// Get all employees
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

// Delete an employee
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


module.exports = {
    addEmployee,
    deleteEmployee,
    getEmployees
}