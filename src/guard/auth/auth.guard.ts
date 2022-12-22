import {
  HttpStatus,
  Injectable,
  CanActivate,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Auth guard that verifies the validity of a JSON Web Token (JWT).
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   * @param jwtService - Service for verifying and signing JWTs.
   */
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Method that determines whether a request should be allowed to proceed or not.
   * @param context - Context object containing information about the current request.
   * @returns Promise that resolves to a boolean value indicating whether the request should be allowed to proceed.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token =
      request.headers['auth-token'] ||
      request.headers['authorization'] ||
      request.headers['token'] ||
      request.headers['x-access-token'];

    if (!token) {
      return false;
    }

    request.user = await this.validateToken(token);

    return true;
  }

  /**
  * Validates a JWT.
  @param auth - String containing the JWT in the format 'Bearer <TOKEN>'.
  @returns Promise that resolves to the decoded JWT payload if the JWT is valid, or rejects with an error if the JWT is invalid.
  */
  async validateToken(auth: string): Promise<object> {
    const [schema, token] = auth.split(' ');

    if (schema !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
      const decode = await this.jwtService.verify(token);
      return decode;
    } catch (err: any) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
