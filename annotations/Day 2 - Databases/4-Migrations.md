#   O que são migrations?
Migrations é o controle de versionamento das tabelas dentro da nossa aplicação. Vai ser um arquivo que possui as alterações feitas no BD em tempo real. Vamos imaginar um equipe para cada tabelas na aplicação, para cada equipe, vai existir uma migration com as alterações que cada equipe fez no BD. No final, vai rolar um merge de todas as migrations que não foram rodadas, deixando assim o código sempre atualizado. De forma resumida, as migrations são o Github do nosso BD

#   Como criar?
CLI é uma ferramenta que pode ser utilizada no terminal, de forma global na aplicação. O que permite a gente instalar o typeORM de forma global na nossa aplicação
-   Vai alterar o ormconfig.json, inserindo o diretório das migrations e dos arquivos criados das migrations:
```
    "database": "src/database/database.sqlite",
    "migrations": ["src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
```

-   Alterar o package.json, adicionando o script para o typeorm, vinculando a CLI do typeorm na aplicação:
```
    . . .
    "scripts": {
        "dev": "ts-node-dev src/server.ts",
        "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
    },
    . . . 
```

-   yarn typeorm -help -> Testar se o script está funcionando
-   yarn typeorm migration:create -n CreateUsers -> Vai criar uma entidade de migration

# Criando as alterações na migration
No arquivo criado após o comando yarn typeorm migration:create, iremos criar uma tabela
```
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    { 
                        name: "name",
                        type: "varchar"
                    },
                ]
            })
        )
    }
```
Há dois métodos na migration: up e down. Quando rodamos a migration, podemos faze-la ou desfazê-la, no caso da up, estamos falando para ele criar a nossa tabela, portanto, o método down será o processo contrário, ou seja, excluir a tabela.
```
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
```

# Rodando as migrations
-   yarn typeorm migration:run
-   No beekeeper, do lado de Entities, aperte o Reload
-   Vai aparecer as migrations criadas, a tabela criada, e o sql sequence
-   yarn typeorm migration:revert Caso queira desfazer a migration