# O que é uma entidade?
Podemos referenciar uma entidade como sendo uma tabela. No caso, podemos ter uma entidade Usuário, que se refere a uma tabela usuário. A estrutura fica mais ou menos assim:
-   Entidade < - > ORM < - > BD
A ORM vai ver qual tabela do BD, a entidade está apontando, então se tiver uma requisição na entidade Usuário, a ORM irá buscar a tabela users no BD.

# Criar automaticamente as migrations e passando o diretório das entidades
O TypeORM pode criar automaticamente nossas migrations, temos de alterar o ormconfig.json:
```
    "entities": ["src/entities,*.ts"],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
```
-   yarn typeorm entity:create -n nomeDaEntidade

# Referenciando uma entidade a uma tabela
Iremos adicionar o nome da tabela desejada do BD, em nossa entidade criada
```
    @Entity("users")
    class User {}
```

# Habilitando os decorators da nossa entidade
-   Temos de alterar o nosso tsconfig, descomentando as seguintes linhas:
```
    "strictPropertyInitialization": false, 
    . . . 
    "experimentalDecorators": true,             
    "emitDecoratorMetadata": true,  
```

# Estruturando a nossa entidade
Temos de dizer como é a estrutura da nossa tabela vinculada, similar ao que inserimos no arquivo das migrations inicialmente. Cada coluna pode ter um tipo diferente, como primaryColumn, CreateAtColumn, e elas serão diferenciadas pelos decorators.
```
    class User {
        @PrimaryColumn()
        readonly id: string;

        @Column()
        name: string;

        @Column()
        email: string;

        @Column()
        admin: boolean;

        @CreateDateColumn()
        created_at: Date;

        @UpdateDateColumn()
        updated_at: Date;
}
```

# Instalando e usando o uuid
-   yarn add uuid
-   yarn add @types/uuid -D
-   import {v4 as uuid} from "uuid" -> Vai usar a versão v4 do uuid, e chamar ela de "uuid" por praticidade no código
-   Terá de ser criado um construtor na nossa entidade, da seguinte forma:
```
    //O id pode não ser passado (no caso de estarmos criando um novo usuário), ou ser passado (no caso de estarmos atualizando um usuário, ou buscando-o)
    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
```
