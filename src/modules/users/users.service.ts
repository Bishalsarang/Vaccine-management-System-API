import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { getTimeAfter } from '../../utils/date.utils';
import { comparePassword } from '../../utils/auth.utils';

import {
  AuthenticationToken,
  JwtTokenPayloadWithoutType,
} from '../../interfaces/token';

import { TOKEN_TYPES } from '../../constant/base.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - The data for creating the user.
   * @returns The created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const existingUser = await this.userRepository.findOneBy({
      username,
    });

    if (existingUser) {
      throw new ConflictException(
        'User with username ' + createUserDto.username + ' already exists',
      );
    }

    // If we do not convert the DTO to UserEntity, the hooks like  @BeforeInsert() doesn't execute
    const user = plainToClass(User, createUserDto);

    return this.userRepository.save(user);
  }

  /**
   *
   * @param user {User}
   * @returns
   */
  getAuthenticationTokens(user: User): AuthenticationToken {
    const { id, username, email } = user;

    const tokenPayload: JwtTokenPayloadWithoutType = { id, email, username };

    const accessTokenPayload = {
      ...tokenPayload,
      exp: getTimeAfter('2h'),
      type: TOKEN_TYPES.ACCESS,
    };

    const refreshTokenpayload = {
      ...tokenPayload,
      exp: getTimeAfter('1d'),
      type: TOKEN_TYPES.REFRESH,
    };

    return {
      accessToken: this.jwtService.sign(accessTokenPayload),
      refreshToken: this.jwtService.sign(refreshTokenpayload),
    };
  }

  /**
   * Login user by generating JWT token.
   *
   * @param loginUserDto - The data for logging in user.
   * @returns {Object} The object with accessToken.
   */
  async login(loginUserDto: LoginUserDto): Promise<AuthenticationToken> {
    try {
      const { username, password } = loginUserDto;

      const existingUser = await this.userRepository.findOneBy({
        username,
      });

      if (!existingUser) {
        throw new BadRequestException(
          "The user doesn't exist. Please signup for the account first.",
        );
      }
      const passwordMatch = await comparePassword(
        password,
        existingUser.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException(
          'Username or password may be incorrect. Please try again',
        );
      }

      return this.getAuthenticationTokens(existingUser);
    } catch (e) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }

  /**
   * Generates the access token based on the refresh token.
   *
   * @param refreshToken
   */
  async refreshToken(refreshToken: string): Promise<AuthenticationToken> {
    const payload = await this.jwtService.verify(refreshToken);

    const { id, type } = payload;

    if (type !== TOKEN_TYPES.REFRESH) {
      throw new UnauthorizedException('Invalid Token Type.');
    }

    const existingUser = await this.userRepository.findOneBy({
      id,
    });

    if (!existingUser) {
      throw new UnauthorizedException("The user doesn't exist. Invalid token");
    }

    return this.getAuthenticationTokens(existingUser);
  }
}
