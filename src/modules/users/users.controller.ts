import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { AuthenticationToken } from './../../interfaces/token';

import { UsersService } from './users.service';

/**
 * Controller for managing users.
 */
@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - The data for creating the user.
   * @returns The created user.
   */
  @Post('/signup')
  @ApiCreatedResponse({ type: User })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Validates the payload. If the user exist in the database returns the JWT token.
   *
   * @param loginUserDto - The data for loggin in.
   * @returns The created user.
   */
  @Post('/signin')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('refreshToken')
  refresh(@Body() payload: RefreshTokenDto): Promise<AuthenticationToken> {
    return this.usersService.refreshToken(payload.refreshToken);
  }
}
