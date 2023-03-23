import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async login(dto: AuthDto){
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
    }
     signin(){
        return {msg: 'sign in'}
     }
}