# Tutorial de todos os arquivos da API
by @LeticiaGSoares

### 1. Estruturando o repositório
1.1. Crie um arquivo server.js (o principal da aplicação)
1.2. Rode `npm init -y`
1.3. Baixe as seguintes dependências (ou só algumas):
> `npm i express sequelize mysql2 jsonwebtoken bcrypt cors dotenv zod cookie-parser multer`
 [express*]: framework do Node.js para facilitar criação de servers;
 [sequelize]: um ORM (Object-Relational Mapper) que permite que o Node interaja com o banco de dados SQL, não precisando escrever as queries diretamente, só utilizando funções;
 [mysql2] (varia dependendo do banco de dados usado):  Necessário para que o sequelize funcione com MySQL e MariaDB ;
 [cors*]: Para fazer com que outros possam usar a API (incluindo o front-end do próprio projeto);
 [bcrypt]: Cria hashing de senhas e os descriptografa quando necessário para aumentar a segurança do sistema;
 [jsonwebtoken]: Para criar e verificar tokens JWT de autenticação e autorização em API's;
 [multer]: Facilita o processo de recebimento e armazenamento de arquivos, como imagens por exemplo. Pode filtrar extensões, tamanhos, renomear e direcionar arquivos, etc.
 [dotenv]: Pacote que permite carregar variáveis de ambiente de um arquivo `.env` para `process.env`
 [zod]: Biblioteca para definir e validar o formato dos dados que entram na API
 [cookie-parser]: Permite a API trabalhar com cookies em requisições - usando o método `HttpOnly`, também aumenta a segurança com relação a ataques XXS
>([*]: é bom ter em qualquer api)

1.4. Adicione `"type": "module"` ao `package.json`
1.5. A arquitetura MVC de pastas deve ser a seguinte: 
> /seu-projeto
│
├── /src                     # Pasta principal do código fonte da aplicação
│   ├── /config                 # Arquivos de configuração (ex: banco de dados, middleware)
│   │   └── conn.js             # Conexão com o banco de dados (Sequelize)
│   │
│   ├── /controllers            # Funções responsáveis pela lógica das rotas
│   │   └── usuarioController.js
│   │
│   ├── /models                 # Modelos de banco de dados (definição das tabelas com Sequelize)
│   │   └── usuarioModel.js
│   │
│   ├── /routes                 # Arquivo que define as rotas da API
│   │   └── usuarioRoutes.js
│   │
│   ├── /helpers OU /middleware # Middleware para autenticação, validação, etc.
│   │   └── auth-token.js
│   │
│
├── /public                 # Arquivos estáticos (ex: imagens, uploads)
│   └── /uploads
│   
├── /node_modules           # Dependências instaladas pelo NPM
├── .env                    # Variáveis de ambiente
├── package.json            # Configurações do projeto, dependências
└── server.js               # Ponto de entrada da aplicação (inicializa o servidor)

### 2. conn.js
2.1 Importe o sequelize, pois esse arquivo é para criar conexão com o banco de dados
2.2. Crie uma const `conn = new Sequelize ('nome', 'usuario', 'senha'), {host: 'localhost', dialect: 'mysql'}`
2.3. Adicione o try catch, utilizando `conn.authenticate()` para autenticar a conexão e depois adicione uma mensagem para sinalizar que o a conexão foi feita com sucesso. Depois adicione `console.error` no catch em caso de erro.

### 3. server.js
3.1. Importe express e o arquivo conn (e outros que você pode utilizar como cors ou cookieParser)
3.2. Crie a const de PORT (em caso de usar dotenv, utilize process.env.PORT)
3.3. Crie a const app = express() - essa variável controlará o server a partir de agora.
3.4. Defina as configurações padrões do server utilizando app.use(). Adicione entre eles `app.use(express.json())` para que o server aceite textos `.json` no body da requisição
> Exemplos:,
`app.use(cors())` //pode ser adicionado especificações como para uso de credenciais (cookies) ou limitar os domínios que podem utilizar o cors
`app.use(cookieParser())`

