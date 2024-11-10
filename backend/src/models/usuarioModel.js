import { DataTypes } from 'sequelize';
import conn from '../config/conn.js'

const Usuario = conn.define('Usuario', {
    usuarioId: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "placeholder.png"
    }
});

export default Usuario;
