# Ideias para inserir no projeto
-   Inserir no github
-   Adicionar notificação no email do usuário que recebeu um elogio(gmail, hotmail, etc)
    -   Criar um serviço de email
-   Pode ser colocado em produção no Heroku
-   Criar o Frontend para a nossa aplicação
-   Explorar novas arquiteturas
-   Criar um handler só para criar os erros customizáveis
-   Usando outro tipo de BD
    -   Iremos mudar as informações no ormconfig.json
    -   No site do typeorm temos as instruções para instalação de drivers, funções para outros BD's



# Usando o cors para interação com o frontend
O cors é uma ferramenta que permite que outras aplicações, que não sejam o backend, consigam acessar a aplicaçaõ em NodeJS
-   yarn add cors
-   yarn add @types/cors
-   Mudar o arquivo **server.ts**
```
import cors from "cors"
. . .
const app = express();
app.use(cors())
```
-   Podemos passar o atributo "origins" se quisermos que nossa requisição seja feito por um IP,site só
```
    app.use(cors({
        origin: ""
    }))
```