import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async login(dto: AuthDto){
      try {
         // hash password
       const hash = await argon.hash(dto.password);
       // save new user
       const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            hash
        }
       })
       delete user.hash
       // return the saves user
        return user
      } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002') throw new ForbiddenException(
                'credential error'
            )
        }
      }

    }
     async signin(dto: AuthDto){
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        // if user does not exist throw exception
        if(!user) throw new ForbiddenException('Credentials incorrect')
        // check user's password by comparing it 
        const pwMatches = await argon.verify(user.hash, dto.password)
        // if password incorrect throw exception
        if(!pwMatches) throw new ForbiddenException('Credentials incorrect')

        delete user.hash
        return user
        return {msg: 'sign in'}
     }
}