#   Conseguindo obter os relacionamentos presentes de um atributo da tabela
-   Iremos pegar o relacionamento de user_sender no nosso listUserReceiveComplimentsService
-   Usaremos o parâmetro relations da função find()
```
class ListUserReceivedComplimentsService {

    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments
    }

}
```
Dessa forma, quando houver a requisição dos elogios recebidos, vai vir as informações normais, mais TODAS  as informações do userSender, do userReceiver e da Tag (todos os seus ids, datas de criação, etc etc)