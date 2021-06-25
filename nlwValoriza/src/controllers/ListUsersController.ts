import { Request, Response } from "express";
import { ListUsersService } from "../service/ListUsersService";


class ListUsersController{
    async handle(request: Request, response: Response){
        const listUsersService = new ListUsersService();

        const usersList = await listUsersService.execute();

        return response.json(usersList)
    }
}

export {ListUsersController}