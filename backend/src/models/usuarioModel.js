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
        allowNull: false // Nome é obrigatório
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false // Email é obrigatório
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
