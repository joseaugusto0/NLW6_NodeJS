import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string,
    password: string,
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest ){

        //Verificar se o email existe
        const usersRepository = getCustomRepository(UsersRepositories);
        const user = await usersRepository.findOne({email});

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        //Verificar se senha tá correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }   

        //Gerar o token
        const Token = sign({
            email: user.email
        },
        "a4aefd65d5864f5a1d5901bf58f0bba8",
        {
            subject : user.id,
            expiresIn: "1d"
        } )

        return Token;
    }

}

export { AuthenticateUserService };