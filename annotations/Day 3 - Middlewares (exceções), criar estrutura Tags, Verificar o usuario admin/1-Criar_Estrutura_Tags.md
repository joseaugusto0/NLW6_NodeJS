#   1 - Criar as migrations para as tags
-   yarn typeorm migration:create -n CreateTags
-   Criar o método up da migration: criar a tabela Tags :
```
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tags",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                { 
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                { 
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ]
        }))
    }
```

-   Criar o método down da migration: deletar a tabela Tags:
```
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tags")
    }
```

-   yarn typeorm migration:run 

# Criar a entidade para a tabela Tags
-   Criar arquivo em /src/entities/Tag.ts
-   Criaremos a classe de Entidade para tag:
```
    @Entity("tags")
    class Tag{
        @PrimaryColumn()
        readonly id: string;

        @Column()
        name: string;

        @CreateDateColumn()
        created_at: Date;

        @UpdateDateColumn()
        updated_at: Date;

        constructor () {
            if(!this.id){
                this.id = uuid(); 
            }
        }
    }
```

# 3 - Criando o Repository para Tag
-   Criar arquivo em /src/repositories/TagRepositories.ts
-   Criar a classe para o Repository das tags:
```
    import {EntityRepository, Repository} from "typeorm"
    import { Tag } from "../entities/Tag"

    @EntityRepository(Tag)
    class TagsRepositories extends Repository<Tag>{}

    export {TagsRepositories}
```

# 4 - Criar os services
-   Criar o arquivo em /src/services/CreateTagService.ts
-   Criar a classe do service para a Tag
```
    class CreateTagService{
        async execute(name: string) {
            const tagsRepository = getCustomRepository(TagsRepositories);

            if(!name){
                throw new Error("Incorrect name!")
            };

            const tagAlreadyExists = await tagsRepository.findOne({
                name
            });

            if(tagAlreadyExists){
                throw new Error("Tag already exists!")
            }

            const tag = tagsRepository.create({
                name
            });

            await tagsRepository.save(tag);
            return tag;
        }
    }
```
Aqui iremos verificar se foi passado um nome de tag, e se a tag a ser cadastrada já existe no nosso BD, se já existir, irá lançar um erro.

# 5 - Criar o controller
-   Criar arquivo em /src/controller/CreateTagsController.ts
-   Criar a classe controller:
```
    class CreateTagController {
        async handle(request: Request, response: Response){
            const {name} = request.body;
            const createTagService = new CreateTagService;

            const tag = await createTagService.execute(name);
            return response.json(tag)
        }
    }
```

# 6 - Referenciando o controller a rota
Vamos adicionar o controller no arquivo **routes.ts**
```
    import { CreateTagController } from "./controllers/CreateTagController";
    import { CreateUsersController } from "./controllers/CreateUsersController";

    const router = Router();
    const createUserController = new CreateUsersController();
    const createTagController = new CreateTagController();

    router.post("/users", createUserController.handle)
    router.post("/tags", createTagController.handle)
```

