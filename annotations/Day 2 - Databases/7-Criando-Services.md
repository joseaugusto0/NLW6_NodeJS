# O que são Services de uma aplicação?
Services, regras de negócio são tudo a mesma coisa. São os services que irão fazer o processamento de criar/deletar informações, passando por toda a verificação e tratamento necessários para nossa aplicação.

# Regras da nossa aplicação - NLW Valoriza
-   Cadastro de usuário
    -   Não é permitido cadastrar mais de um usuário com o mesmo email
    -   Não é permitido cadastrar usuário sem email
-   Cadastro de Tag
    -   Não é permitido cadastrar mais de uma tag com o mesmo nome
    -   Não é permitido cadastrar tag sem nome
    -   Não é permitido o cadastro por usuário não administradores
-   Cadastro de elogios
    -   Não é permitido usuário cadastrar um elogio para si mesmo
    -   Não é permitido cadastrar elogios para usuário inválidos
    -   O usuário precisa estar autenticado na aplicação

# Fluxo da nossa aplicação
-   server -> Recebe o request
-   Controller
-   SERVICE
-   Repositories
-   Entidade
-   ORM
-   BD

# Criando a camada de service
-   Criar pasta: /src/service
-   Criar arquivo: /src/service/CreateUserService.ts
    -   Nesse caso, iremos criar um arquivo para cada função desejada
```
    interface IUserRequest {
        name: string;
        email: string;
        admin: boolean
    }

    class CreateUserService({name, email, admin} : IUserRequest) {
        async execute() {
            
        }
    }

    export { CreateUserService }
```
O IUserRequest é só uma interface para facilitar na desestruturação das informações recebidas

#   Fazendo as verificações do service para criação de usuários
-   Criando a verificação de criação de dois usuários em um mesmo email:
```
    async execute({name, email, admin} : IUserRequest) {
        const UsersRepository = getCustomRepository(UsersRepositories)

        if(!email){
            throw new Error("Email incorrect")
        }
        const userAlreadyExists = await UsersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const user = UsersRepository.create({
            name,
            email,
            admin
        });

        UsersRepository.save(user);

        return user;
    }
```
Ele irá pegar o repositório dos usuários, vai utilizar a função findOne() para pesquisar um registro (pelo email passado) na tabela, e caso encontre um, vai resultar em um erro ali no segundo "throw".
Caso o email não seja passado como parâmetro, ele já irá dar o erro no primeiro "throw".
Se caso passar nas verificações, ele irá criar um objeto de usuário, com os parâmetros passados, utilizando o método create(), e posteriormente, usar o método save() para salvar esse objeto.
Ao final, ele retorna o objeto do usuário criado, para conseguirmos obter essa variável posteriormente
O getCustomRepositories é necessário, pois só ele pode instânciar um repositório em uma variável no código.
