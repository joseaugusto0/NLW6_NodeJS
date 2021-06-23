import {Request, Response, NextFunction} from "express"

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    //Verificar se o usuário é admin
    const admin = false;

    if(admin){
        return next;
    }

    //Status 401 - Unauthorized
    return response.status(401).json({
        error: "User isn't admin",
    })
}