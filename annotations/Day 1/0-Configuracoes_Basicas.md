# NLW Valoriza App
O projeto se trata de um app que propõe o elogio entre profissionais, onde haverá varios usuários cadastrados, tags cadastradas (elogios possíveis, somente para o administrador), o cadastro dos elogios para algum usuário, autenticação de usuário por token JWT, verificação de que o usuário está logado nas rotas necessárias, listagem de usuários, listagem de tags e por fim, a listagem de elogios por usuário 

# Usando o Imsomnia e o Beekeper
Para testar as nossas rotas criadas pelo nosso APP, iremos usar o app **Imsomnia**. Pode ser usado o **Postman** também.
Para testar e visualizar o banco de dados gerado no app, vai ser usado o **Beekepper**

# Criando uma primeira aplicação com o NodeJS
-   Entrar no diretório com o terminal
-   yarn init -y
        Vai criar um package.json
        O -y vai pegar todas as informações padrões e inserir no package.json
-   yarn add typescript -D
        Vai instalar a dependência do typescript
        O -D está falando que a depêndencia só será utilizada no modo de desenvolvimento
        Vai ser criada uma pasta "node_modules" e o package.json já puxara a dependência instalada
-   Criar um arquivo index.js de teste
-   yarn tsc --init
        Vai inicializar o typescript
        Gerará um arquivo "tsconfig.json"
        No arquivo tsconfig, vamos passar a key "strict" para false --> Desabilita umas checagens do typescript, porque já serão feitas no código
-   yarn tsc
        Vai converter o código em typescript para um javascript, para que o node entenda e execute
        Vai gerar um arquivo index.js
-   node index.js
        Vai rodar o arquivo criado após a "tradução" de typescript para javascript
-   app = express()
        Vai criar um objeto do express
-   app.listen(3080, () => console.log('Server is running'))
        Vai criar um listener na porta 3080 na url http://localhost:3080/

# Automatizando a tradução do código em typescript para uma lingua legível ao NodeJS
-   yarn add ts-node-dev -D
        Vai instalar um tradutor automatizado de typescript para javascript
-   Adicionar o ts-node-dev para rodar o script automaticamente
-   Em package.json, ficará assim:
```
{
  ...
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
  ...
}
```
-   yarn dev
    Já vai inicializar nosso código descrito no package.json, sem precisar traduzi-lo manualmente
    Caso mudemos nosso código, o próprio ts-node-dev já faz o reload da aplicação


# Usando o express
O Express é um framework que vai ser usado para criar as rotas da nossa aplicação e os nossos recursos
-   yarn add express
        Irá instalar para desenvolvimento e produção a dependência do Express
-   yarn add @types/express -D
        Irá instalar as tipagens do express, para que possamos pegar todas as funções presentes em um objeto do express
-   Criar um arquivo "server.ts"
-   import express from "express"
        Vai importar a dependência instalada no script

# Padronização de pastas
Para melhor organização, dentro da nossa aplicação, vai ser criada uma pasta "src", que se destinará apenas a parte dos códigos da nossa aplicação



