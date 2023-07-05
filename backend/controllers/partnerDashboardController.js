const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')
const {
    getDatesBetween,
    getCurrentDate
} = require('../utilities/dateUtils');
const path = require('path')
const fs = require('fs');


const getProfile = (req, res) => {
    const id = req.user_id
    console.log(id)
    mysql_MBS.query(
        "SELECT * FROM partners WHERE partner_id = ?",
        [id],
        (err, result)=>{
            if(err) {
                res.status(500).json({message: 'Error ID'});
                return
            }
            res.status(200).json({
                name: result[0].partner_name,
                email: result[0].partner_email,
                mobile: result[0].partner_contact,
            });

        }
    )
}

const updateProfile = (req, res) => {
    const id  = req.user_id
    const {
        name,
        email,
        mobile,
        address,
        description,
        oldPassword,
        newPassword
    } = req.body

    if(oldPassword === ""){
        mysql_MBS.query(
            "UPDATE partners SET partner_name = ?, partner_email = ?, partner_contact = ?, partner_address = ?, partner_description = ? WHERE partner_id = ?",
            [name, email, mobile, address, description, id],
            (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error updating partner', err });
                }
                else {
                    res.status(200).json({message: "partner Updating Successful"});
                }
            }
        )
    }

    else {
        mysql_MBS.query(
            "SELECT partner_password FROM partners WHERE partner_id = ?",
            [id],
            async (err, result)=>{
                if(err){
                    res.status(500).json({ error: 'Error retreive the old password when updating partner' });
                    return
                }
    
                const hashedPassword = result[0].partner_password
                const isPasswordMatch = await comparePasswords(oldPassword, hashedPassword)
    
                if(isPasswordMatch) {
                    const hashedPassword = await hashPassword(newPassword)
                    mysql_MBS.query(
                        "UPDATE partners SET partner_name = ?, partner_email = ?, partner_contact = ?, partner_password = ?, partner_address = ?, partner_description = ? WHERE partner_id = ?",
                        [name, email, mobile, hashedPassword, address, description, id],
                        (err, result)=>{
                            if(err){
                                res.status(500).json({ error: 'Error updating partner' });
                            }
                            else {
                                res.status(200).json({ message: 'Partner updated successfully' });
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

const publishPlans = (req, res) => {
    const id = req.user_id
    const data = req.body

    // Insert the data into MYSQL Database
     const query = 'INSERT INTO plans (plan_date, plan_origin, plan_destination, plan_time, plan_price, partner_id) VALUES (?,?,?,?,?,?)'

    const datesBetween = getDatesBetween(data.fromDate, data.toDate)
    for (let i = 0; i < datesBetween.length; i++) {
        const date = datesBetween[i]
        mysql_MBS.query(
            query,
            [date, data.departFrom, data.arriveTo, data.selectedTime, data.price, id],
            (err, results)=> {
                if(err){
                    return res.status(500).json("Error Occured")
                }
            }
        )
    }

    return res.status(200).json("Successful")
}

const todayDate = getCurrentDate()
const getRoutes = (req, res) => {
    const id = req.user_id
    // console.log(id)
    mysql_MBS.query(
        `SELECT plan_date, plan_origin, plan_destination, plan_time, plan_price FROM plans 
         WHERE plan_date>= ? AND partner_id = ? 
         ORDER BY plan_date, plan_origin, plan_time`,
        [todayDate, id],
        (err, results) => {
            if(err){
                res.status(500).json({message: 'Error retrieving data from table'})
                return
            }
            else {
                const groupedData = results.reduce((groups, plan) => {
                    const { plan_date, plan_origin, plan_destination, plan_time, plan_price } = plan
                    const group = groups.find(group => group.plan_date === plan_date)

                    if(group){
                        group.routes.push({
                            plan_origin,
                            plan_destination,
                            plan_time,
                            plan_price
                        });
                    }

                    else {
                        groups.push({
                            plan_date,
                            routes: [{
                              plan_origin,
                              plan_destination,
                              plan_time,
                              plan_price
                            }]
                        });
                    }
                    return groups
                }, [])
                res.json(groupedData)
            }
        }
    )
}

const addLogo = (req, res) => {
    const partnerId = req.user_id
    const {originalname} =req.file
    const imageUrl = `/images/logoImages/${originalname}`;

    // Save image details to the database
    mysql_MBS.query(
        "UPDATE partners SET partner_logoImg = ? WHERE partner_id= ?",
        [imageUrl, partnerId],
        (err, result)=>{
            if(err){
                console.error(err)
                res.status(500).json({error: 'Failed to upload image'})
            }
            else {
                res.status(200).json({
                    logo_url: imageUrl
                });
            }
        }
    )
}


module.exports = {
    getProfile,
    updateProfile, 
    publishPlans,
    getRoutes,
    addLogo
}