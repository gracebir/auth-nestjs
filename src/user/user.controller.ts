import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private user: UserService){}
    @UseGuards(AuthGuard('jwt'))
    @Get('me/:id')
    getMe(@Param() params){
        return this.user.getMe(parseInt(params.id))
    }
}
