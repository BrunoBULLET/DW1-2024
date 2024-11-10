const express = require("express")
const mysql2 = require("mysql2")


const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "root123"
})

connection.query("SELECT * FROM mydb.status;",(err,results)=>{
    console.log(results)
})

const app = express()
app.post("/insert",(req,res)=>{
    
})