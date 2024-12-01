const express = require("express")
const mysql2 = require("mysql2")
const cors = require("cors")



const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "root123"
})



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.post("/inserir",(req,res)=>{
    console.log(req.body) 
    connection.execute("INSERT INTO mydb.status(idstatus,nome,nivel,estrela,aces,raridade,engrenagem)VALUES(?,?,?,?,?,?,?);",
        [req.body.id,
        req.body.nome,
        req.body.nivel,
        req.body.poderEstrela,
        req.body.acessorio,
        req.body.raridade,
        req.body.engrenagem,
        ],(err,results)=>{
            console.log(results)
        }
    )   
})

app.get("/select",(req,res)=>{
    connection.query("SELECT * FROM mydb.status;",(err,results)=>{
        console.log(results)
        res.json({results:results})
    })

})
app.delete("/delete/:id",(req,res)=>{
    console.log(req.params.id)
    connection.execute("DELETE FROM mydb.status where idstatus=?;",[req.params.id],(err,results)=>{
        console.log(results)
    })
})
app.put("/alterar",(req,res)=>{
    connection.execute("UPDATE mydb.status SET nome = ?, nivel = ?, estrela = ?, aces = ?, raridade = ?, engrenagem = ? WHERE idstatus = ?;",
        [req.body.nome,
        req.body.nivel,
        req.body.poderEstrela,
        req.body.acessorio,
        req.body.raridade,
        req.body.engrenagem,
        req.body.id,
        ],(err,results)=>{
            console.log(results)
        }
    )   
})



app.listen(8080)