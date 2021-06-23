# Melhorando as exceções da nossa requisição.
Utilizando o **throw new Error**, a requisição irá ficar parada, pois não haverá um response para ela. Temos de tratá-la de forma adequada. Utilizando o **throw**, iremos apenas passar o Error gerada para a camada acima.
-   No nosso caso, estaremos passando o Error da camada do **Service** para a **Controller**.
-   Portanto, o controller deve pegar esse Error e tratar ele da melhor forma.
-   Temos 2 formas pra tratar a exceção:
    -   Deixar nossa estrutura dentro de um try e um catch
    ```
        class CreateUsersController {
            async handle(request: Request, response: Response){
                try{
                    const {name, email, admin} = request.body;
                    const createUserService = new CreateUserService();
                    const user = await createUserService.execute({name, email, admin});
                    return response.json(user)
                }catch(err){
                    return response.status(400).json({error: err.message})
                }
            
            }
        }
    ```
    -   Se formos fazer a tratativa no controller, teremos de colocar o try catch em todos os nossos controllers, deixando o código mais extenso. Para evitarmos isso, iremos colocar a tratativa dois níveis acima, no **server.ts**, como sendo um middleware nas nossas rotas.

# O que é middleware?
Middleware são interceptadores que temos dentro de uma requisição, podendo interrompê-la por completa, ou adicionar a ela informações, tudo pelo middleware.
Então, em resumo, entre a requisição e a resposta do servidor, terá um middleware, o qual cuidará das nossas tratativas.
Na nossa aplicação, no terceiro dia, estamos utilizando 2 middlewares: um para habilitar a utilização de json como estrutura de corpo dos métodos, e outro para separar as routes em um arquivo separado (injetando as rotas no nosso servidor).

# Criando o middleware
No nosso caso, iremos inserir um middleware após o middleware das rotas. O fluxo será:
-   Requisição chegará
-   Routes roteará a requisição ao devido controller
-   Routes obterá a resposta
-   Resposta entrará no nosso middleware de tratamento
-   Servidor envia de volta nossa resposta

Para a criação dos nossos middlewares de erro, 4 parâmetros terão de ser usados (se caso o middleware  tiver outr funcionalidade, apenas 3 parâmetros vão ser passados)
```
    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {})
```
-   err: Error -> Parâmetro que verificará se há algum erro que foi lançado por um **throw**
-   request: Request -> Request recebido
-   response: Response -> Response processado no controller
-   next: NextFunction -> Utilizado quando após a tratativa, queremos realizar alguma outra função, como por exemplo, a autenticação de um usuário

Iremos criar agora a tratativa dos errors:
```
    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof Error){
            return response.status(400).json({error: err.message})
        }

        return response.status(500).json({
            status: "Error",
            message: "Internal server error"
        })
    })
```
Caso ele receba um err do tipo Error (instanceof Error), ele irá retornar um response de status 400, com a mensagem de erro pega. Caso ele pegue um erro, mas que não seja do tipo Error, estaremos contando com um erro interno da nossa aplicação, portanto, iremos retornar um status 500 e a mensagem de erro interno do servidor

# Errors com o Express
Quando estamos lidando com requisições que utilizam o async, ele não consegue capturar os erros que estarão vindo para ele. Por exemplo, se o Service mandar um Error para a camada de Controller, e a função de controller for um async function, ele não conseguirá pegar esse erro (isto é um erro do express). Precisamos instalar uma biblioteca para lidar com esses erros
-   yarn add express-async-errors
```
    import express, { NextFunction, Request, Response } from "express";
    import "express-async-errors";
```
Obs: o express-async-errors tem que ser importado logo em sequência do express
