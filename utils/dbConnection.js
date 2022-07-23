import mysql from "mysql"
import {config} from "dotenv"
config({path: "./.env"})

export default function dbConnection() {
    const dbConnect = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    dbConnect.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connected to database")
            let SQL = "CREATE TABLE IF NOT EXISTS products( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price INT NOT NULL, description VARCHAR(255) NOT NULL)";
            dbConnect.query(SQL,(err,result)=>{
                if(err){
                    console.log(err)
                }
                console.log("Table created successfully")
            })
        }
    }
    )
    return dbConnect
}