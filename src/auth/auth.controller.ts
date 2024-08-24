import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUser } from './dto/login-user.dto';
import LoginResponse from './interfaces/auth.interface';

@Controller('/auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Post('/login')
    async login(@Body() userToVerify: LoginUser): Promise<LoginResponse> {
        return await this.AuthService.Login(userToVerify);

    }
}
