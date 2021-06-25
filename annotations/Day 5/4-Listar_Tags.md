# Criando o service para listar Tags
-   Criar o arquivo /src/service/ListTagsService.ts
-   Será listado todas as tags
```
class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = await tagsRepositories.find();

        return tags
    }
}
```

# Criando o controller para listar as Tags
```
class ListTagsController{
    async handle(request: Request, response: Response){
        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();

        return response.json(tags)
    }
}
```

# Inserindo a rota para o nosso controller
```
const listTagsController = new ListTagsController();
. . . 
router.get("/tags", ensureAuthenticated, ensureAdmin, listTagsController.handle)
```

Teremos dois requests com o mesmo endereço "localhost:3000/tags", porém uma é com método POST, e outra com método GET, portanto, não dará conflito.

# Personalizando o campo com o "valor" da tag
Queremos que o as tags venham com mais um campo, que tenha o padrão "#Tagname"

```
class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        let tags = await tagsRepositories.find();

        tags = tags.map(tag => ({...tag, nameCustom: `#${tag.name}`}))

        return tags
    }
}
```
A função map vai realizar algo com cada objeto presente em tags pego por find().
...tag vai recuperar TODAS as informações do objeto de tag
nameCustom é o novo campo que iremos adicionar

# Personalizando campos das Tags com a biblioteca class-transformer
Da forma anterior, o typeorm irá pegar todas as informações, e só depois iremos poder editar elas com informações que não estão dentro do BD
Porém a biblioteca class-transformer, como o nome diz, permite que transformemos a nossa classe, passando informações pra ela
-   yarn add class-transformer
-   Iremos alterar a entidade da Tags para adicionar o class-transformer
    -   Será utilizado o objeto Expose do class-transformer, pois ele irá exibir atributos que não estão presentes na classe
    ```
    import { Expose } from "class-transformer"
    . . . 
    @Expose({name: "nameCustom"})
    namecustom(): string {
        return `#${this.name}`
    }
    ```
-   Alterando o service para listar tags
O classToPlain irá pegar as informações e adicionar o objeto que inserimos na Entidade Tag, de forma automatizada
```
import { classToPlain } from "class-transformer"
. . . 
class ListTagsService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = await tagsRepositories.find();

        return classToPlain(tags);
    }
}
```
