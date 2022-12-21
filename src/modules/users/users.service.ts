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
import { comparePassword } from 'src/utils/auth.utils';

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
    const { userName } = createUserDto;
    const existingUser = await this.userRepository.findOneBy({
      userName,
    });

    if (existingUser) {
      throw new ConflictException(
        'User with username ' + createUserDto.userName + ' already exists',
      );
    }

    // If we do not convert the DTO to UserEntity, the hooks like  @BeforeInsert() doesn't execute
    const user = plainToClass(User, createUserDto);

    return this.userRepository.save(user);
  }

  /**
   * Login userr by generating JWT token.
   *
   * @param loginUserDto - The data for logging in user.
   * @returns {Object} The object with accessToken.
   */
  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    try {
      const { userName, password } = loginUserDto;

      const existingUser = await this.userRepository.findOneBy({
        userName,
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

      return {
        accessToken: this.jwtService.sign({
          id: existingUser.id,
          sub: loginUserDto.userName,
          IsEmail: existingUser.email,
        }),
      };
    } catch (e) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }
}
