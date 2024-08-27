import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service'; // Asegúrate de importar tu AuthService
import { User } from '../../users/entities/user.entity'; // Asegúrate de importar tu entidad User

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token de la cabecera Authorization
      secretOrKey: 'whatever', // La misma clave utilizada para firmar el token
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUserById(payload.user.id); // Llama a un método en AuthService que valide el usuario
    if (!user) {
      throw new UnauthorizedException(); // Lanza excepción si el usuario no es válido
    }
    return user; // Retorna el usuario si es válido
  }
}