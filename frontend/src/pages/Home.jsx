import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const baseURL = "http://localhost:3333";
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post(
                    `${baseURL}/u/verificar-token`,
                    {}, // Corpo vazio, pois é um POST apenas para verificação
                    { withCredentials: true } // Inclui o cookie na requisição
                );

                // Supondo que a API responde com 200 para token válido
                if (response.status === 200) {
                    setIsValidToken(true);
                }
            } catch (error) {
                console.error("Erro na verificação do token:", error);
                setIsValidToken(false); // Token inválido ou erro na requisição
            }
        };

        console.log("verifyToken: ", verifyToken())
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;
