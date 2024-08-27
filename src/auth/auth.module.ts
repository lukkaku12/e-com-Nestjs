
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule correctly
//idk why the jwt Module aint working in this module.
// ... rest of the code
import { JwtStrategy } from './strategies/jwt.strategy'; // Asegúrate de que la ruta sea correcta
import { UsersService } from '../users/users.service'; // Importa el UsersService si es necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'whatever', // Cambia esto por una clave más segura y no la expongas
      signOptions: { expiresIn: '1h' }, // Establece el tiempo de expiración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService], // Agrega JwtStrategy y UsersService si es necesario
})
export class AuthModule {}