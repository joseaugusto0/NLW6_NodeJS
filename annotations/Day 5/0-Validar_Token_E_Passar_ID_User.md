# Criando middleware para verificação autenticação do usuário pelo JWT
-   /src/middlewares/ensureAuthenticaded.ts
-   Precisamos receber o token
-   Validar se o token tá preenchido
-   Validar se o token é válido
-   Recuperar informações do usuário

## 1 - Recebendo o Token
No Insomnia, em qualquer requisição, você pode configurar a autenticação da requisição em Auth.
Exemplo, a autenticação Basic é passando os valores de username e password configurados no servidor
Iremos utilizar o Bearer Token no Insomnia pra conseguir utilizar as rotas dele
O Token vai ser recebido da seguinte forma no request.body.authorization:
```
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlb.....
```
E será obtido na função da seguinte forma:
```
    import { Request, Response, NextFunction} from 'express'
    import { verify } from 'jsonwebtoken'

    interface IPayload{
        sub: string;
    }

    export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

        //Receber o token
        const token = request.headers.authorization;
```

## 2 - Validar se o token está preenchido
Ele vai só enviar o erro 401 se não obtiver o token
```
    . . . 
    //Validar se o token está preenchido
    if(!token){
        return response.status(401).end()
    }
    . . . 
```

## 3 - Validar se é um token válido
-   O token que recebemos no request vem no padrão descrito acima, porém não precisamos daquele "Bearer", então iremos tirar ele com o split, pegando só a parte de interesse, no caso o token
-   A função verify toma dois parâmetros:
    -   Token recebido no request
    -   Token MD5 que geramos (Será de outra forma, mas até o momento da aula, foi usado esse código MD5)
    -   Podemos passar uma função para caso o token não seja válido, mas foi optado pelo uso do try/catch
-   Caso a função verify aponte que o token não é válido, irá cair automaticamente no catch

```
    //Verificar se o token é valido
    //Precisamos tirar aquele "Bearer " do token recebido no request
    const [,token] = authToken.split(" ")
    try{
        const decode = verify(token,"a4aefd65d5864f5a1d5901bf58f0bba8") as IPayload
    }catch(err){
        return response.status(401).end();
    }
```

## 4 - Recuperar dados do usuário
Iremos pegar o id do usuário que vem no token, e dessa forma passarmos ele em cada requisição só com o token
O Request não possui o campo user_id, porém, o typescript possui algumas funções que conseguimos sobrescrever alguns tipos de bibliotecas que já tem suas tipagens
-   Iremos criar uma pasta em /src/@types/express
-   Criaremos o arquivo /src/@types/express/index.d.ts
```
    declare namespace Express{

        //Vai pegar toda a tipagem existente no @type original (dentro do node_modules)
        //E adicionar as funções que inserirmos em {}
        export interface Request{
            user_id: string;
        }
    }
```
-   Temos que alterar o **tsconfig.json** para aceitar nossos novos arquivos de tipagem
    -   Há uma key chamada de "typeRoots", onde iremos descomenta-la, e inserir nossa nova pasta @types
    ```
        "typeRoots": ["./src/@types"],  
    ```
-   Agora pegamos o user_id no request da seguinte forma:
```
    try{
        const { sub } = verify(token,"a4aefd65d5864f5a1d5901bf58f0bba8") as IPayload;

        request.user_id = sub;

        //Retornando para a aplicação
        return next();

    }catch(err){
        return response.status(401).end();
    }
``` 
-   Agora precisamos pegar esse user_id posteriormente
    -   Iremos pegar primeiramente no ensureAdmin (pois é a verificação que vem logo em seguida)
    -   Lembre que no ensureAdmin colocamos só um admin = true, pois iriamos fazer a verificação posteriormente
    ```
    export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    
        //Obtendo o user_id que vem junto no request (pós o ensureAuthenticated)
        const { user_id } = request;

        //Verificar se o usuário é admin
        const userRepositories = getCustomRepository(UsersRepositories);
        const {admin} = await userRepositories.findOne(user_id)
        . . . 
    
    ```

## Inserindo o middleware na aplicação
Iremos inserir na inserção de tags antes do ensure admin, pois precisamos verificar se o usuário está autenticado na aplicação, antes de verificar se ele é admin

```
. . . 
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
. . . 
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
```

