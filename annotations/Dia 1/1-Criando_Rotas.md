# Criando a primeira rota
Métodos disponíveis:
-   Get -> Buscar uma informação na API
-   Post -> Inserir/criar uma informação na API
-   Put -> Alterar uma informação na API
-   Delete -> Excluir uma informação na API
-   Patch -> Alterar uma informação específica na API (alterar o avatar de um usuário)

```
import express from "express";

const app = express();

app.get("/test", (request, response) => {
    //Request -> Entrando
    //Response -> Saindo
    return response.send("Olá NLW")
})

app.post("/test-post", (request, response) => {
    return response.send("Olá NLW método POST")
})

app.listen(3000, () => console.log("Server is running"));
```
Vai criar um método GET na porta 3000 e no recurso /test, em que quando digitado a url http://localhost:3000/test, vai obter um texto simples "Olá NLW". 
Além disso, vai ter um método POST, que só poderá ser testado pelo Imsomnia, pois ele será o cliente que requisitará a rota

# Usando o Imsonia nos métodos POST
-   Crie um request collection no Imsonia (eu criei um chamado NLW6)
-   Botão direito embaixo de Dashboard - new request
-   Dê o nome da sua request e defina como POST
-   Na URL coloque: localhost:3000/test-post
-   Ao clicar em Send, ele vai exibir o retorno da Rota
-   Para otimizar a url de rotas futuras, vá em manage environments
-   Em base environment insira assim:
```
{
  "baseURL": "http://localhost:3000"
}
```
-   Na URL agora, digite "base" e aperte CTRL + Espaço, e selecione __baseURL
-   Vai ficar assim: __baseURL/test-post
-   Pronto, você não precisa mais colocar essa parte da rota ao inserir no método no Insomnia

