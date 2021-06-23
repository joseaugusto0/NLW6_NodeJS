
# Adicionando a verificação de cadastro de Tags apenas por administradores
-   Precisamos de uma validação do usuário que está fazendo o cadastro, se ele é o ou não administrador
-   O usuário será autenticado por passar o seu email e senha
-   Vai ser gerado um token
-   Com o token vai ser verificado se o usuário é ou não um administrador
-   Essa verificação vai ser feita por um middleware

# Passos de criação da middleware
-   Criar pasta em /src/middlewares
-   Criar arquivo: /src/middlewares/ensureAdmin.ts
-   Iremos usar uma função para verificar se o usuário é admin:
```
    export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
        //Verificar se o usuário é admin
        const admin = true;

        if(admin){
            return next;
        }

        //Status 401 - Unauthorized
        return response.status(401).json({
            error: "User isn't admin",
        })
    }
```
Estamos usando o const admin=true, pois a estrutura de verificação JWT ainda não foi criada. Mas de forma resumida, se essa variável admin for dada como true, irá prosseguir com a próxima função (no caso, criar uma tag pelo controller), caso não, retornará um erro direto para quem fez o request.

-   Precisamos inserir esse middleware em **routes.ts**
    -   Se colocarmos direto um app.use(), todas as rotas passarão por esse middleware de autenticação de admin, e não queremos isso, queremos a verificação apenas para a rota de criação de tags.
    -   Iremos passar o middleware direto na definição da rota:
    ```
        router.post("/tags", ensureAdmin, createTagController.handle)
    ```
