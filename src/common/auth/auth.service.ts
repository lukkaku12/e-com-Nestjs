import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import LoginResponse from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository:Repository<User>) {}

    async Login(user: Partial<User>): Promise<LoginResponse> {
        try {
            // Encuentra el usuario por nombre
            const userFound = await this.usersRepository.findOneBy({ name: user.name });
            if (!userFound) {
                throw new Error('Usuario no encontrado');
            }

            // Compara la contraseña proporcionada con la almacenada
            const isPasswordValid = await bcrypt.compare(user.password, userFound.password);
            console.log(isPasswordValid)
            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }

            // Devuelve un JWT si la autenticación es exitosa
            return { status: 200, response:this.parseUser(userFound)};
            
        } catch (error) {
            // Maneja errores y lanza excepciones adecuadas
            throw new Error(`Error en el login: ${error.message}`);
        }
    }

    parseUser(user: Partial<User>) {
        return jwt.sign({user}, "whatever", {expiresIn: '1h'})
    }

    verifyAuthenticity(token: string) {
        const result = jwt.verify(token, 'whatever');
        if (!result) return;
        return true;
    }
}
