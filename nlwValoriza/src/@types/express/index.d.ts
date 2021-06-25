declare namespace Express{

    //Vai pegar toda a tipagem existente no @type original (dentro do node_modules)
    //E adicionar as funções que inserirmos em {}
    export interface Request{
        user_id: string;
    }
}