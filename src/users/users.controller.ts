import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    GetAllUsers():Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Post()
    PostNewUser(@Body() newUser: createUserDto): Promise<User> {
        return this.usersService.createUser(newUser);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:number) {
        return this.usersService.deleteUser(id);
    }
}
