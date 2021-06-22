# Tipos de parâmetros:
-   Route Params -> Parâmetros dentro da rota (localhost:3000/produtos/id_do_produto)
```
    app.get("/test/{id}", (request, response) => {
        const id = request.params.id;
        return ...
    })
```
-   Query Params -> Parâmetros que fazem parte de uma query (localhost:3000/produtos?name=teclado&description=tecladoBom)
    No caso das query params, não é obrigatório ter os parâmetros

-   Body Params -> Parâmetros que utiliza no POST, PUT e o PATCH, os parâmetros vão vir no corpo da requisição 
```
    //Exemplo dos parâmetros recebidos
    { 
        "name" : "teclado",
        "description" : "tecladoBom"
    }
```

