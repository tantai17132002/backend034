import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { validationPipeOptions } from '../user/validation.pipe.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check-health')
  checkHealth(): string {
    return 'ok';
  }

  @Post('create')
  // Use ValidationPipe
  @UsePipes(validationPipeOptions)
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Received DTO:', createUserDto); // Log received data
    const user = await this.userService.create(createUserDto);
    return { id: user.id, username: user.username };
  }

  // Endpoint to get list of users
  @Get('list')
  async list() {
    return await this.userService.findAll();
  }
}
