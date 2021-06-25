import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //Receber o token
    const authToken = request.headers.authorization;

    //Validar se o token está preenchido
    if(!authToken){
        return response.status(401).end()
    }

    //Verificar se o token é valido
    //Precisamos tirar aquele "Bearer " do token recebido no request
    const [,token] = authToken.split(" ")
    try{
        const { sub } = verify(token,"a4aefd65d5864f5a1d5901bf58f0bba8") as IPayload;

        request.user_id = sub;

        //Retornando para a aplicação
        return next();

    }catch(err){
        return response.status(401).end();
    }

    

    
}