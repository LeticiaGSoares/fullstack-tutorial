import {Sequelize} from 'sequelize'

const conn = new Sequelize(
    "socialMedia", "root", "MySql@3360", 
    {host: "localhost", dialect: "mysql"}
)

try {
    await conn.authenticate()  // Autentica a conexão
    console.log("Connection to MySQL has been established successfully.")
} catch (error) {
    console.error("Unable to connect to the database:", error)
}

export default conn;