import {Sequelize} from 'sequelize'

const conn = new Sequelize(
    "socialMedia", "root", "MySql@3360", 
    {host: "localhost", dialect: "mysql"}
)

try{
    await conn.authenticate()
    console.log("Connection MYSQL")
}catch(error){
    console.error("error: ", error)
}

export default conn;