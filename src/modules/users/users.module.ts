import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.SECRET_KEY || 'SECRET' }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [JwtModule],
})
export class UsersModule {}
