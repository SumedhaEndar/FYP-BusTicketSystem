const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')
const path = require('path')
const fs = require('fs');


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


/*------------------------------- Admin Dash Others -------------------------------------*/
const addStation = (req, res) => {
    const {
        name,
        state,
        address,
        district
    } = req.body

    // Perform mysql query to insert the data to the database
    mysql_MBS.query(
        "INSERT INTO stations (station_name, station_district, station_state, station_address) VALUES (?,?,?,?)",
        [name, district, state, address],
        (err, result) => {
            if(err){
                res.status(500).json({error: err.message})
            }
            else {
                res.status(200).json({message: `Added ${name}`});
            }
        }
    )
}

const addCarousel = (req, res) => {
    const {carouselName} = req.body
    const {originalname} =req.file
    const imageUrl = `/images/carousels/${originalname}`;

    // Save image details to the database
    mysql_MBS.query(
        "INSERT INTO carousels (carousel_name, carousel_filename, carousel_url) VALUES (?,?,?)",
        [carouselName, originalname, imageUrl],
        (err, result)=>{
            if(err){
                console.error(err)
                res.status(500).json({error: 'Failed to upload image'})
            }
            else {
                res.status(200).json({
                    carousel_id: result.insertId,
                    carousel_name: carouselName,
                    carousel_filename: originalname,
                    carousel_url: imageUrl
                });
            }
        }
    )
}

const deleteCarousel = (req,res) =>{
    const id = req.params.id;

    // Retrieve the image details from the database using the id
    mysql_MBS.query(
        'SELECT * FROM carousels WHERE carousel_id = ?',
        [id],
        (err, results)=>{
            if(err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to delete carousel' });
            }
            else{
                if (results.length === 0) {
                    res.status(404).json({ error: 'Image not found' });
                }
                else {
                    const carouselImage = results[0];
                    const carouselImagePath = path.join(__dirname, '../images/carousels', carouselImage.carousel_filename);

                    // Delete the carousel image file from the server's storage
                    fs.unlink(carouselImagePath, (err)=>{
                        if(err){
                            console.error(err)
                            res.status(500).json({error: "Failed to delete carousel image"})
                        }
                        else {
                            // Remove the carousel record from the database
                            mysql_MBS.query(
                                "DELETE FROM carousels WHERE carousel_id = ?",
                                [id],
                                (err)=>{
                                    if(err){
                                        console.error(err)
                                        res.status(500).json({error: 'Failed to delete carousel'})
                                    }
                                    else {
                                        res.status(200).json(id)
                                    }
                                }
                            )
                        }
                    })
                }
            } 
        }
    )
}

const getCarouselList = (req,res)=>{
    // Retrieve all carousels info from the database
    mysql_MBS.query(
        'SELECT * FROM carousels',
        (err, results)=>{
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to fetch images' });
            } 
            else {
                res.status(200).json({results});
            }
        }
    )
}
/*-----------------------------------------------------------------------------------------*/


/*-------------------------------- Admin Dash Request -------------------------------------*/
const getRequest = (req,res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 1
    const offset = (page-1)*limit

    // Execute first query
    mysql_MBS.query(
        'SELECT COUNT(*) as total_count FROM partnersregistration',
        (err, countResult)=>{
            if(err){
                throw err
            }

            const totalCount = countResult[0].total_count

            //Execute second query
            mysql_MBS.query(
                "SELECT * FROM partnersregistration LIMIT ? OFFSET ?",
                [limit, offset],
                (err, dataResult)=>{
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

const declineRequest = (req, res)=> {
    const { id } = req.params

    mysql_MBS.query(
        'DELETE FROM partnersregistration WHERE partner_id = ?',
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

const acceptRequest = (req, res)=> {
    const { id } = req.params
    const {
        name,
        email,
        contact, 
        address
    } = req.body

    const defaultPassword = "Sumedha_12345"

    mysql_MBS.beginTransaction((err)=>{
        if(err){
            console.error('Error starting transaction: ', err);
            return res.status(500).json({ error: 'An error occurred.' });
        }

        //Check if the email already existed in the partners table ?
        mysql_MBS.query(
            "SELECT * FROM partners WHERE partner_email = ?",
            [email],
            async (err, result)=>{
                if(err){
                    mysql_MBS.rollback(()=>{
                        console.error('Error adding data');
                        return res.status(500).json({message: 'An error occurred.'});
                    })
                }
                // If email exists, return an error
                if(result.length > 0) {
                    mysql_MBS.rollback(()=>{
                        console.error('Email Already Existed');
                        return res.status(400).json({message: 'Email already exists'})
                    })
                }
                
                else{
                    // Hash the password
                    const hashedPassword = await hashPassword(defaultPassword)
                    
                    // Add the data to the partners table
                    mysql_MBS.query(
                        "INSERT INTO partners (partner_name, partner_email, partner_contact, partner_address, partner_password) VALUES (?,?,?,?,?)",
                        [name, email, contact, address, hashedPassword],
                        (err, result) => {
                            if(err){
                                mysql_MBS.rollback(() => {
                                    console.error('Error adding data: ');
                                    return res.status(500).json({message: 'An error occurred.'});
                                });
                            }
    
                            // Delete data from the partners registration table
                            mysql_MBS.query(
                                'DELETE FROM partnersregistration WHERE partner_id = ?',
                                [id],
                                (err, result)=>{
                                    if(err){
                                        mysql_MBS.rollback(()=>{
                                            console.error('Error deleting data: ', err);
                                            return res.status(500).json({message: 'An error occurred.'});
                                        })
                                    }
    
                                    mysql_MBS.commit((err)=>{
                                        if (err) {
                                            mysql_MBS.rollback(() => {
                                                console.error('Error committing transaction: ', err);
                                                return res.status(500).json({message: 'An error occurred.'});
                                            });
                                        }
                                        console.log('Transaction committed.');
                                        return res.status(200).json({ message: 'Success' });
                                    })
                                }
                            )
                        }
                    )
                }
            }
        )
    })
    
    
}
/*-----------------------------------------------------------------------------------------*/

module.exports = {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeProfile,
    updateEmployeeProfile,
    getFeedback,
    deleteFeedback,
    addStation,
    addCarousel,
    deleteCarousel,
    getCarouselList,
    getRequest,
    declineRequest,
    acceptRequest
}