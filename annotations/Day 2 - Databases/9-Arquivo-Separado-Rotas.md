#   Como fazer a separação do arquivo
-   Criar um arquivo no diretório /src : routes.ts
```
    import { Router } from "express"
    import { CreateUsersController } from "./src/controllers/CreateUsersController";

    const router = Router();
    const createUserController = new CreateUsersController();

    router.post("/users", createUserController.handle)
    export {router};
```

Vai gerar uma variável router, que vai cuidar de todas as rotas da nossa aplicação, vai pegar o controller que foi criado (criação de usuários), e atribuir a rota "localhost:3000/users" para que o controller criado processe o mesmo. No caso, na nossa classe CreateUsersController, a gente já explicitou que ele vai receber os parâmetros request e response, portanto, não precisamos explicitar essa passagem de parâmetros aqui no route.ts

-   Importar o routes no nosso server.ts
```
    import { router } from "./routes";
    const app = express();
    app.use(express.json())
    app.use(router)
```
A função use() vai funcionar como um middleware para juntar a nossa aplicação do express com as rotas explicitas no arquivo routes.ts.
Além disso, o use vai dizer para a nossa aplicação, que ela terá de receber request com corpo em json, pois isso não é feito de forma automática para o express, você tem de explicitar isso
