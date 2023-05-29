require('dotenv').config()

const express = require('express')
const mysql_MBS = require('./database/database')
const customerRoutes = require('./routes/customer')


// express app
const app = express()


// middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/customers',customerRoutes)


// Connect to the MySQL database
mysql_MBS.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } 
    else {
        // listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to MySQL database');
            console.log(`Listening on Port ${process.env.PORT}`)
        })
    }
});
