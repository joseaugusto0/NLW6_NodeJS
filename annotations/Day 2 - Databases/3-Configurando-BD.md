# Instalar o TypeORM para o sqlite
Vai ser utilizado um BD em SQLite por já ser nativo do node, facilitando o trabalho
-   yarn add typeorm reflect-metadata sqlite3
reflect-metadata -> biblioteca que permite a utilização de decorators

# Configurando e inicializando o Database
-   Criar uma pasta para o database (src/database)
-   Dentro da pasta /src/database, criar um arquivo index.ts, a qual vai ser colocado as configurações dessa conexão
```
    import {createConnection} from "typeorm"

    createConnection();
```
-   Criar um arquivo ormconfig.json na pasta raíz do projeto para inserir as configurações do BD
```
//SQLite não precisa passar usuário, senha e porta
//Host padrão já é o localhost
{
    "type": "sqlite",
    "database": "src/database/database.sqlite"
}
```
-   Em server.ts, você vai importar o database:
```
    import "./database"
```
Por padrão ele já vai pegar o arquivo index.ts

-   yarn dev -> Vai criar o database.sqlite

#  Abrindo o BD no Beekeeper
-   Select Connection Type - SQLite
-   Choose File - Escolha o arquivo database.sqlite
-   Test - Testar a conexão com o DB
-   Connection Name - Dê o nome para a conexão com o BD
-   Save
-   Connect

