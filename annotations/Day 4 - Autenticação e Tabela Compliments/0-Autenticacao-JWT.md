# Autenticação por JWT

## O que é o JWT?
O JWT (Json Web Tokens) é um padrão de token que podemos criar com algumas propriedades dele, que permite a gente fazer a comunicação entre requisições utilizando esse token. A nossa aplicação irá verificar se esse token é um token válido, existente, se ele já expirou ou não, etc.
Em suma, o JWT é um token que iremos passar entre as requisições para garantir que as rotas que precisam ser autenticadas, sejam acessadas só por usuários administradores. O bom do JWT é que com ele não precisamos mandar sempre o usuário e senha pra cada requisição, e sim enviar só o token.

## Como é a estrutura do JWT
O JWT tem essa estrutura:
```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

O JWT é dividido em três partes (e no token, essas partes são dividas por ponto):
-   Header (Algoritmo usado e tipo de token)
    ```
        {
            "alg": "HS256",
            "typ": "JWT"
        }
    ```
-   Payload (Informações que queremos passar)
    ```
        {
            "sub": "1234567890",
            "name": "John Doe",
            "iat": 1516239022
        }
    ```
-   Verify Signature (Concatenar as informações anteriores de forma codificada)
    ```
        HMACSHA256(
            base64UrlEncode(header) + "." +
            base64UrlEncode(payload),
            your-256-bit-secret
        )
    ```

# Utilizando o JWT no código
## Instalando o JWT e a tipagem dele
-   yarn add jsonwebtoken
-   yarn add @types/jsonwebtoken -D

## Criando uma nova coluna de senha na tabela "users"
-   Criaremos uma migration para adicionar essa coluna:
    -   yarn typeorm migration:create -n AlterUserAddPassword
-   Criando o método up da migration (para gerar a coluna password):
    ```
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.addColumn(
                "users",
                new TableColumn({
                    name: "password",
                    type: "varchar",
                    isNullabe: true,
                })
            )
        }
    ```
-   Criando o método down da migration (para excluir a coluna password):
    ```
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropColumn("users", "password")
        }
    ```
-   Temos um usuário cadastrado sem senha, por isso colocamos o "isNullabe:true"
-   yarn typeorm migration:run
-   Alterando a classe de entidade do usuário:
    ```
        . . . 
        @Column()
        name: string;

        @Column()
        password: string;
        . . . 
    ```
-   Alterando o service do usuário:
    ```
        interface IUserRequest {
            name: string;
            email: string;
            admin: boolean;
            password: string;
        };

        class CreateUserService {
            async execute({name, email, admin = false, password} : IUserRequest) {
                const UsersRepository = getCustomRepository(UsersRepositories)

                if(!email){
                    throw new Error("Email incorrect");
                }
                const userAlreadyExists = await UsersRepository.findOne({
                    email
                });

                if(userAlreadyExists){
                    throw new Error("User already exists");
                }

                const user = UsersRepository.create({
                    name,
                    email,
                    admin,
                    password
                });

                UsersRepository.save(user);

                return user;

            }
        }
    ```
-   Alterando o controller:
    ```
    class CreateUsersController {
        async handle(request: Request, response: Response){
            
            const {name, email, admin, password} = request.body;

            const createUserService = new CreateUserService();

            const user = await createUserService.execute({name, email, admin, password});

            return response.json(user)
        }
    }
    ```

## Encriptando a senha do usuário ao enviarmos para o BD
Do jeito atual, se inserirmos um usuário pelo request, a senha ficará exposta no BD para qualquer um. Abrindo o BD no beekeeper, conseguimos observar as senhas. Portanto, precisamos criptografar essa senha!
Iremos encriptar a senha usando a biblioteca bcryptjs
-   yarn add bcryptjs
-   yarn add @types/bcryptjs -D
-   Iremos inserir essa criptografia no Service do usuário
    ```
        import { hash } from "bcryptjs"
        . . . 
        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        //Primeiro parâmetro - senha
        //Segundo parâmetro - Qual método de encriptação utilizar
        const passwordHash = await hash(password, 8)

        const user = UsersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });
    ```

# Fazendo a autenticação de usuario
-   Precisamos fazer uma rota para realizar a autenticação do usuário
-   Iremos criar um service em /src/service/AuthenticateUserService.ts
-   Para ser autenticado, o usuário vai ter que passar o email e a senha dele
-   Primeiramente, precisamos verificar se o email do usuário existe:
    ```
        import { getCustomRepository } from "typeorm";
        import { UsersRepositories } from "../repositories/UsersRepositories";

        interface IAuthenticateRequest {
            email: string,
            password: string,
        }

        class AuthenticateUserService {

            async execute({email, password}: IAuthenticateRequest ){

                //Verificar se o email existe
                const usersRepository = getCustomRepository(UsersRepositories);
                const user = await usersRepository.findOne({email});

                if(!user){
                    throw new Error("Email/Password incorrect")
                }
    ```
-   Caso exista, precisamos comparar a senha passada com a senha do BD:
    ```
        import { compare } from "bcryptjs"
        . . . 

        //Verificar se senha tá correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }   
    ```
-   Por fim, se o usuário for autenticado, temos de gerar um token para ele
    ```
    import { sign } from "jsonwebtoken"
    . . . 

    //Gerar o token
    const Token = sign({
        email: user.email
    },
    "a4aefd65d5864f5a1d5901bf58f0bba8",
    {
        subject : user.id,
        expiresIn: "1d"
    } );

    return Token;
    ```
    -   O primeiro parâmetro do sign é o payload
        -   Iremos passar o email do usuário
    -   O segundo parâmetro é a secret key
        -   Usaremos uma chave MD5 (podendo ser criada no site https://www.md5hashgenerator.com/) qualquer
    -   O terceiro parâmetro são as opções do token
        -   subject é a informação que quero passar do usuário, e iremos passar o id do usuário
        -   expiresIn é o quanto de tempo o token vai ser válido sem ter um refresh. O cenário ideal é um token que expira em um período curto, de 15 min, e teríamos um refresh token com mais frequência. Mas por facilidade, iremos colocar o refresh token de 1 dia

-   Gerando o controller da autenticação
```
    import {Request, Response} from 'express'
    import { AuthenticateUserService } from '../service/AuthenticateUserService';

    class AuthenticateUserController {

        async handle(request: Request, response: Response){
            const {email, password} = request.body;
            const authenticateUserService = new AuthenticateUserService();
            const token = await authenticateUserService.execute({email,password});
            return response.json({token})
        }
    }

    export {AuthenticateUserController}
```

- Criando a rota de autenticação em routes.ts
```
    const authenticateUserController = new AuthenticateUserController();
    ...
    router.post("/login", authenticateUserController.handle)
    export {router};
```

