import jwt from 'jsonwebtoken'
const secretKey = 'senhaJwt'; // Use uma chave segura e armazenada em variáveis de ambiente

const authenticateToken = (req, res, next) => {
    const token = req;
    console.log(req)

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }

        req.user = user; // Anexa os dados decodificados do token ao req.user
        next();
    });
};

export default authenticateToken