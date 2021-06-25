# Criando o service para listar Users
-   Criar o arquivo /src/service/ListUsersService.ts
-   Será listado todas as tags
```
class ListUsersService {
    async execute(){
        const usersRepositories = getCustomRepository(UsersRepositories)

        const users = await usersRepositories.find();

        return users
    }
}
```

# Criando o controller para listar os Users
```
class ListUsersController{
    async handle(request: Request, response: Response){
        const listUsersService = new ListUsersService();

        const usersList = await listUsersService.execute();

        return response.json(usersList)
    }
}
```

# Inserindo a rota para o nosso controller
```
const listUsersController = new ListUsersController();
. . . 
router.get("/users", ensureAuthenticated, listUsersController.handle)
```

Teremos dois requests com o mesmo endereço "localhost:3000/tags", porém uma é com método POST, e outra com método GET, portanto, não dará conflito.


# Retirando a senha do usuário no request
-   Alterando a Entity do User
```
    @Exclude()
    @Column()
    password: string;
```
O @Exclude é outra função do class-transformer, só que esse será passado para excluirmos a informação na requisição

-   Alterando o service
```
class ListUsersService {
    async execute(){
        const usersRepositories = getCustomRepository(UsersRepositories)

        const users = await usersRepositories.find();

        return classToPlain(users)
    }
}
```