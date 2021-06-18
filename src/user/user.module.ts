import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserTransformer } from './transformers/user.transformer';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserTransformer, UserService],
  controllers: [UserController],
})
export class UserModule {}
