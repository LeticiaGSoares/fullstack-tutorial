import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import Usuario from '../models/usuarioModel.js'
import authenticateToken from '../helpers/auth-token.js';

const router = express.Router();
const saltRounds = 10; // Define o número de rounds de salt para o bcrypt

router.get('/', async (req, res) => {
//ver usuários e poder filtrar eles por email e id
    const {email, id} = req.query

    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (page - 1) * limit

    try {
        // Array com os campos permitidos para filtro
        const filtrosPermitidos = ['email', 'id'];
        
        // Construir o objeto `whereCondition` com base nos filtros permitidos
        const whereCondition = filtrosPermitidos.reduce((acc, filtro) => {
            if (req.query[filtro]) {  // Se o filtro existir e tiver um valor
                acc[filtro] = req.query[filtro];
            }
            return acc;
        }, {});  

        // Consulta com filtros e paginação
        const usuarios = await Usuario.findAndCountAll({
            where: whereCondition,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        
        const totalPaginas = Math.ceil(usuarios.count / limit)
        res.status(200).json({
            totalUsuarios: usuarios.count,
            totalPags: totalPaginas,
            pagAtual: parseInt(page),
            itensPorPag: limit,
            ProximaPag: totalPaginas === 0 ? null : `http://localhost:3333/u?page=${page + 1}`,
            pagAnterior: page - 1 === 0 ? null : `http://localhost:3333/u?page=${page - 1}`,
            usuarios: usuarios.rows
        });
        
    } catch (err) {
        console.error({error: err})
        res.status(500).json({error: "Erro interno do servidor: "+ err})
    }
})

router.post('/registrar', async (req, res) => {
    try {
        const { nome, email, senha, foto } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({error: 'Nome, email e senha são obrigatórios.' });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({error: 'O email já está em uso.' });
        }

        const hashedSenha = await bcrypt.hash(senha, saltRounds);

        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: hashedSenha,
            foto
        });

        res.status(201).json({ 
            message: 'Usuário criado com sucesso.',
            usuario: {
                usuarioId: novoUsuario.usuarioId,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                foto: novoUsuario.foto
            }
        });
    } catch (err) {
        console.error('Erro ao criar o usuário:', err);
        res.status(500).json({error: 'Erro ao criar o usuário.' });
    }
});

router.post('/login', async (req, res) => {
    const {email, senha} = req.body

    if (!email) {
        return res.status(401).json({ error: "Email não registrado" });
    }
    if (!senha) {
        return res.status(500).json({ error: "Erro no servidor: senha do usuário não encontrada." });
    }

    try { 
        const usuario = await Usuario.findOne({where : {email: email}})
        if (!usuario) {
            return res.status(401).json({ error: "Email não registrado" });
        }

        const validarSenha = await bcrypt.compare(senha, usuario.senha);
        if (!validarSenha) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const acessToken = jwt.sign({email}, "senhaJwt", {expiresIn: '15m'})
        
        // O cookie HTTP-only não pode ser acessado por JavaScript, o que o protege de ataques XSS.
        res.cookie('token', acessToken, {
            httpOnly: true,    // Impede que o JavaScript do navegador acesse o cookie
            secure: true,      // Envia o cookie apenas em conexões HTTPS (ideal para produção)
            sameSite: 'Strict', // Protege contra CSRF ao restringir o envio do cookie a requisições do mesmo site
            maxAge: 30 * 24 * 60 * 60 * 1000 // Tempo de expiração do cookie (30 dias em milissegundos)
        });

        res.json({acessToken})

    } catch (err) {
        console.error('Erro ao criar o usuário:', err);
        res.status(500).json({error: 'Erro ao logar usuário.' });
    }
})

router.post('/logout', async (req, res) => {

})

router.post('/update/:usuarioId', async (req, res) => {
//atualizar
})

router.post('/verificar-token', async (req, res) => {
    const {token} = req.body

    try {
        authenticateToken()
    } catch (err) {
        console.error({error: err})
        res.status(500).json({error: "Erro interno do servidor: "+ err})
    }
})
    

export default router;
