import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    
    //Obtendo o user_id que vem junto no request (pós o ensureAuthenticated)
    const { user_id } = request;

    //Verificar se o usuário é admin
    const userRepositories = getCustomRepository(UsersRepositories);
    const {admin} = await userRepositories.findOne(user_id)
    

    if(admin){
        return next();
    }

    //Status 401 - Unauthorized
    return response.status(401).json({
        error: "Unauthorized",
    })
}