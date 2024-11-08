import express from 'express';
import bcrypt from 'bcrypt';
import Usuario from './models/usuarioModel.js'

const router = express.Router();
const saltRounds = 10; // Define o número de rounds de salt para o bcrypt

// Rota para criar um novo usuário
router.post('/registrar', async (req, res) => {
    try {
        const { nome, email, senha, foto } = req.body;

        // Validação básica dos campos obrigatórios
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
        }

        // Verifica se o email já está em uso
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'O email já está em uso.' });
        }

        // Hash da senha com bcrypt
        const hashedSenha = await bcrypt.hash(senha, saltRounds);

        // Cria o novo usuário com a senha hashificada
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: hashedSenha,
            foto
        });

        // Retorna o usuário criado (sem a senha por segurança)
        res.status(201).json({ 
            message: 'Usuário criado com sucesso.',
            usuario: {
                usuarioId: novoUsuario.usuarioId,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                foto: novoUsuario.foto
            }
        });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

export default router;
