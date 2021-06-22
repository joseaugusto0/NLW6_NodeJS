# O que é controller?
O controller vai fazer o tratamento/ações com o request e o response, deixando o server apenas para receber os request da nossa aplicação.

# Criando um controller
-   Criar a pasta: /src/controllers
-   Criar o arquivo: /src/controllers/CreateUsersController.ts
```
    import { Request, Response } from "express"
    import { CreateUserService } from "../service/CreateUserService";

    class CreateUsersController {
        async handle(request: Request, response: Response){
            const {name, email, admin} = request.body;

            const createUserService = new CreateUserService();

            const user = await createUserService.execute({name, email, admin});

            return response.json(user)
        }
    }

    export {CreateUsersController};
```
Nosso código irá pegar o request, pegar o corpo dele (onde fica as informações/parâmetros) e desestruturá-las. Após isso, vai chamar o Service criado, e usar o execute() para que seja criado então o usuário no bd, passando os parâmetros recebidos no request para o service.

# Criando a rota para criar o usuário pelo Insomnia
-   Botão direito no lado esquerdo do app
-   New Request
-   Name -> Create User
-   Method -> POST
-   Body -> JSON
-   Adicionamos um json no seguinte formato:
```
    {
        "name": "",
        "email": "",
        "admin": true
    }
```

# Separando as rotas da nossa aplicação em um arquivo diferente
