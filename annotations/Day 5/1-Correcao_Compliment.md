# Qual o erro?
Quando estamos criando um novo elogio (Compliment), ao invés de passarmos o user_sender na requisição (no controller do compliments), iremos pegar direto do token!

```
class CreateComplimentController{
    async handle(request: Request, response: Response){
        const {tag_id, user_receiver, message} = request.body;
        const { user_id } = request;
        const createComplimentService = new CreateComplimentService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        });

        return response.json(compliment)
    }
}
```
