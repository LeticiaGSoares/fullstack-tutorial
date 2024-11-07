import { Router } from "express"
import bcrypt from 'bcrypt'
import Usuario from './models/usuarioModel.js'

const router = Router()

router.post("/registrar", async (req, res)=> {
    const { nome, email, senha} = req.body

    try{
        const existingEmail = await Usuario.findOne({where: {email: email}})
        if(existingEmail){
            return res.status(400).json({message: "Email já existe"})
        }
        
        const senhaHashada = bcrypt.hash(senha, 10)
        
        const novoUsuario = {
            nome,
            email
        }

        await Usuario.create(novoUsuario, {senha: senhaHashada})
        res.status(201).json({message: "Novo usuário criado com sucesso!"})
    }catch(err){
        console.error({error: err})
        res.status(500).json({message: "Erro no servidor"})
    }
})

export default router