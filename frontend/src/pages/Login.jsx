import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

const Login = () => {
    const baseURL = "http://localhost:3333"
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.elements.email.value;
        const senha = e.target.elements.senha.value;
    
        console.log(`email: ${email} || senha: ${senha}`);
    
        try {
            const response = await axios.post(`${baseURL}/u/login`, 
                {email, senha}, 
                {withCredentials: true}
            );
            // Esta opção permite o envio de cookies com a requisição
    
            console.log('Login bem-sucedido', response.data);
            console.log("cookie", document.cookie)
            setIsAuthenticated(true)
    
        } catch (error) {
            console.error('Erro no login:', error.response ? error.response.data : error.message);
            alert('Login falhou! Tente novamente.');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/u/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    <input type="email" name="email" placeholder="Digite seu email"/>
                </label>
                <label htmlFor="senha">
                    <input type="password" name="senha" placeholder="Digite sua senha"/>
                </label>
                <input type="submit" value="aaa" />
            </form>
        </>
    )
}

export default Login