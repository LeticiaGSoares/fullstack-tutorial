import { DataTypes } from 'sequelize';
import conn from '../config/conn.js'

const Usuario = conn.define('Usuario', {
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
        allowNull: false // Senha é obrigatória
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false // Foto é obrigatória
    }
});

export default Usuario;
