
import { GatewayTimeoutException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id:number):Promise<User> {
    return await this.usersRepository.findOneBy({id:id})
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      // Hashea la contraseña
      newUser.password = await bcrypt.hash(user.password, 10);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      
      throw new GatewayTimeoutException('Failed to hash password');
    }

  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    try {
      await this.usersRepository.update(id, user);
      return this.getUserById(id);
      
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }


}
