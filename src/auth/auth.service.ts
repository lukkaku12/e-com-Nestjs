import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import LoginResponse from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async validateUser(name: string, password: string): Promise<User | null> {
    const userFound = await this.usersRepository.findOneBy({ name });
    if (!userFound) {
      return null; // Retorna null si el usuario no se encuentra
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return null; // Retorna null si la contraseña no es válida
    }

    return userFound; // Retorna el usuario si es válido
  }

  async validateUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id }); // Valida al usuario por ID
  }

  async login(user: Partial<User>): Promise<LoginResponse> {
    const userFound = await this.usersRepository.findOneBy({ name: user.name });
    if (!userFound) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return { status: 200, response: this.parseUser(userFound) }; // Devuelve un JWT si la autenticación es exitosa
  }

  parseUser(user: Partial<User>) {
    return jwt.sign({ user: { id: user.id, name: user.name } }, 'whatever', { expiresIn: '1h' }); // Incluye el ID y el nombre en el payload del token
  }

  verifyAuthenticity(token: string) {
    const result = jwt.verify(token, 'whatever');
    if (!result) return false;
    return true;
  }
}