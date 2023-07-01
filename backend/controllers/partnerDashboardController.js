const mysql_MBS =  require('../database/database')
const {
    hashPassword,
    comparePasswords
} = require('../utilities/bcryptHash')
const {
    getDatesBetween,
    getCurrentDate
} = require('../utilities/dateUtils');


const getProfile = (req, res) => {   
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
    mysql_MBS.query(
        `SELECT plan_date, plan_origin, plan_destination, plan_time, plan_price FROM plans 
         WHERE plan_date>= ? 
         ORDER BY plan_date, plan_origin, plan_time`,
        [todayDate],
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

module.exports = {
    getProfile,
    publishPlans,
    getRoutes
}