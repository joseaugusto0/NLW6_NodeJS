# O que são repositórios?
As entidades não conseguem fazer uma ponte direta entre o nosso código em javascript e o nosso BD, mesmo com a ORM. Para isso existem os repositórios. ELES que fazem a conexão entre as nossas entidades e o nosso BD. Criar novas informações, deletar, alterar, etc.
-   Entidade < - > Repositórios < - > ORM < - > BD

# Criar repositórios:
-   Criar uma pasta: /src/repositories
-   Criar o arquivo: /src/repositories/nomeDoRepository.ts
```
    import {EntityRepository, Repository} from "typeorm";
    import { User } from "../entities/User"

    @EntityRepository(User)
    @EntityRepository(User)
    class UsersRepositories extends Repository<User>{}
        // O extend é para conseguirmos pegar todas as funções da classe repository, provida pela typeorm, que contém funções como salvar novos dados na tabela, excluir, etc.

    export { UsersRepositories };
```