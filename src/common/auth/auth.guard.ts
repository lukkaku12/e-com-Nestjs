import * as jwt from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

interface UserPayload extends jwt.JwtPayload {
  role: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new UnauthorizedException('Malformed header');
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Malformed token');
    }

    try {
      const decoded = jwt.verify(token, 'whatever');
      const role = JSON.stringify(decoded);
      const decodedRole = JSON.parse(role);
      // Check if the decoded token is a JwtPayload and has a 'role' property


      if (decodedRole.user.role !== 'admin') {
        throw new UnauthorizedException('Insufficient privileges');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Error in token validation');
    }
  }
}
