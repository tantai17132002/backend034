import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { HttpExceptionFilter } from './user/try-exception';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
