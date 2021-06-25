# Criando dois services de listagem:

## Service para listar elogios enviados
-   /src/service/ListUserSendComplimentsService.ts
```
class ListUserSendComplimentsService {

    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepository.find({
            where: {
                user_sender: user_id
            }
        })

        return compliments
    }
}
```

## Service para listar elogios recebidos
-   /src/service/ListUserReceivedComplimentsService.ts
```
class ListUserReceivedComplimentsService {

    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            }
        })
        return compliments
    }
}
```

# Criando os controllers

## Controller para listar elogios recebidos
-   Criar arquivo em /src/controllers/ListUserReceivedComplimentsController.ts
```
class ListUserSendComplimentsController {
    async handle(request: Request, response: Response){
        const {user_id} = request;
        const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();

        const compliments = await listUserReceivedComplimentsService.execute(user_id)

        return response.json(compliments)
    }
}
```

## Controller para listar elogios enviados
-   Criar arquivo em /src/controllers/ListUserSendComplimentsController.ts
```
class ListUserSendComplimentsController {
    async handle(request: Request, response: Response){
        const {user_id} = request;
        const listUserSendComplimentsService = new ListUserSendComplimentsService();

        const compliments = await listUserSendComplimentsService.execute(user_id)

        return response.json(compliments)
    }
}
```

# Adicionar as rotas dos controllers para listagem
Iremos usar o método GET no **routes.ts** para a nossa listagem em uma requisição
```
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
. . . 
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceivedComplimentsController.handle)
```

