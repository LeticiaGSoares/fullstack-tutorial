
const handleSubmit = (e) => {
    e.preventDefault()

    const email = e.target.elements.email.value
    const senha = e.target.elements.senha.value

    console.log(`email: ${email} || senha: ${senha}`)
}

const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label for="email">
                    <input type="email" name="email" placeholder="Digite seu email"/>
                </label>
                <label for="senha">
                    <input type="senha" name="senha" placeholder="Digite sua senha"/>
                </label>
                <input type="submit" value="aaa" />
            </form>
        </>
    )
}

export default Login