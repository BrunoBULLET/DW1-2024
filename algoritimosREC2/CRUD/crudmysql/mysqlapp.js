const express = require("express")
const mysql2 = require("mysql2")
const cors = require("cors")
const bodyParser = require("body-parser")


const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "root123"
})



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5500",
    methods:["GET","POST"],
    allowedHeaders:["Content-Type"]
}))
app.get("/inserir",(req,res)=>{
    console.log(req.query) 
    connection.execute("INSERT INTO `mydb`.`status`(`idstatus`,`nome`,`nivel`,`estrela`,`aces`,`raridade`,`engrenagem`)VALUES(?,?,?,?,?,?,?);",
        [req.query.id,
        req.query.nome,
        req.query.nivel,
        req.query.poderEstrela,
        req.query.acessorio,
        req.query.raridade,
        req.query.engrenagem,
        ],(err,results)=>{
            
        }
    )   
})

app.get("/select",(req,res)=>{
    connection.query("SELECT * FROM mydb.status;",(err,results)=>{
        console.log(results)
        res.json({results: results})
    })

})



app.listen(8080)

