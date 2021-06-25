# Precisamos criar a estrutura da tabela Compliments (elogios)

## Criando a migration
-   yarn typeorm migration:create -n CreateCompliments
-   Nossa tabela vai ter foreign keys (user_sender,user_receiver,tag_id)
    -   Precisamos puxar essas informações de id's de tabelas externas (users e tags)
    -   No typeorm tem duas formas de gerar a foreign key:
    -   1ª Forma:
    ```
    new Table({
        name: "compliments",
        columns: [
            ...
        ],
        foreignKeys: [
            {
                name: "FKUserSenderCompliments"     //Nome para conseguirmos nos referenciar a FK
                referencedTableName: "users",       //Nome da tabela que vai vir a informação  
                referencedColumnNames: ["id"],      //Nome da coluna da tabela que vai vir a informação
                columnNames: ["user_sender"],       //Nome da col. da tab. que vai receber a info
                onDelete: "SET NULL",   //Se o tab de origem del. a info. o que eu faço?               
                onUpdate: "SET NULL",   //Se o tab de origem atual. a info. o que eu faço? 
            }
        ]
    })
    ```
    -   2ª Forma:
    ```
        new Table({
            name: "compliments",
            columns: [
                ...
            ],
            })
        )

        await queryRunner.createForeignKey(
            "compliments",
            new TableForeignKey({
                name: "FKUserSenderCompliments",    
                referencedTableName: "users",       
                referencedColumnNames: ["id"],      
                columnNames: ["user_sender"],       
                onDelete: "SET NULL",                 
                onUpdate: "SET NULL",   
            })
        )
    ```
    -   Dessa 2ª forma, se quisermos desfazermos a migration, vamos ter que adicionar uma função adicional no nosso método down.
-   Método up:
```
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                    },
                    {
                        name: "user_receiver",
                        type: "uuid",
                    },
                    {
                        name: "tag_id",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",     
                        referencedTableName: "users",        
                        referencedColumnNames: ["id"],      
                        columnNames: ["user_sender"],       
                        onDelete: "SET NULL",              
                        onUpdate: "SET NULL",   
                    },
                    {
                        name: "FKUserReceiverCompliments",     
                        referencedTableName: "users",        
                        referencedColumnNames: ["id"],      
                        columnNames: ["user_receiver"],       
                        onDelete: "SET NULL",              
                        onUpdate: "SET NULL",   
                    },
                    {
                        name: "FKTagCompliments",     
                        referencedTableName: "tags",        
                        referencedColumnNames: ["id"],      
                        columnNames: ["tag_id"],       
                        onDelete: "SET NULL",              
                        onUpdate: "SET NULL",   
                    },
                ]
            })
        )

        
    }
```

-   Método down:
```
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments")
    }
```

-   yarn typeorm migration:run

## Criando a entidade
-   src/entities/Compliment.ts
Nossas colunas de user_sender, user_receiver, e tag_id podem ter um tipo de relacionamento com as tabelas externas dentro da entidade.
-   Método de relacionamento na entidade:
Dessa forma conseguimos puxar tudo da relacionado à tag_id (id, name, created_at, updated_at), ao invés de pegarmos só o valor de tag_id
-   No JoinColumn podemos ter o relacionamento 1 para 1: Um elogio para uma tag. Logo, não podemos ter repetições de elogios, nem de tag.
-   '' Podemos ter o relacionamento de muitos para 1: Vários elogios para uma tag.
-   '' Podemos ter o relacionamento de 1 para muitos: Um elogio para várias tags
-   '' Podemos ter o relacionamento de muitos para muitos: Vários elogios para várias tags
-   No nosso caso, muitos elogios podem ser feitos a uma tag, portanto:
    ```
        
        import { Tag } from "./Tag";
        . . .
        @Column()
        tag_id: string;

        @JoinColumn({name: "tag_id"})
        @ManyToOne(() => Tag)
        tag = Tag;
        . . .

    ```
-   A entidade ficará da seguinte forma:
```
    @Entity("compliments")
    class Compliment{
        @PrimaryColumn()
        readonly id: string;

        @Column()
        user_sender: string;

        @JoinColumn({name: "user_sender"})
        @ManyToOne(()=> User)
        userSender: User

        @Column()
        user_receiver: string;

        @JoinColumn({name: "user_receiver"})
        @ManyToOne(() => User)
        userReceiver: User;

        @Column()
        tag_id: string;

        @JoinColumn({name: "tag_id"})
        @ManyToOne(() => Tag)
        tag = Tag;

        @Column()
        message: string;

        @CreateDateColumn()
        created_at: Date;

        constructor(){
            if(!this.id){
                this.id = uuid();
            }
        }
    }
```

## Criando o repositório
-   src/repositories/ComplimentsRepositories.ts
```
    @EntityRepository(Compliment)
    class ComplimentsRepositories extends Repository<Compliment>{}
```

## Criando o Service
-   src/service/CreateComplimentService.ts
```
    interface IComplimentRequest {
        tag_id: string;
        user_sender: string;
        user_receiver: string;
        message: string;
    }

    class CreateComplimentService{
        async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
            const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
            const usersRepositories = getCustomRepository(UsersRepositories)

            //Verificar se user_receiver e user_sender são iguais
            if(user_receiver == user_sender){
                throw new Error("Incorrect user receiver!")
            }
            
            //Checando se o user_receiver existe
            const userReceiverExists = await usersRepositories.findOne(user_receiver);

            if(!userReceiverExists){
                throw new Error("User Receiver does not exists!")
            }

            
            const compliment = complimentsRepositories.create({
                tag_id,
                user_receiver,
                user_sender,
                message
            })

            complimentsRepositories.save(compliment);

            return compliment;

        }
    }

```

## Criando o controller
-   src/controllers/CreateComplimentController.ts
Por enquanto iremos passar sem a verificação do token (pois será passado na próxima aula), iremos passar só as informações de tag_id, user_sender, user_receiver e message
```
class CreateComplimentController{
    async handle(request: Request, response: Response){
        const {tag_id, user_sender, user_receiver, message} = request.body;
        const createComplimentService = new CreateComplimentService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        return response.json(compliment)
    }
}
```

## Adicionando o controller as rotas
-   routes.ts
```
    . . .
    const createComplimentController = new CreateComplimentController();
    . . . 
    router.post("/compliment", createComplimentController.handle)
    . . .
```

