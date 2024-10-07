import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto'; 

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('check-health')
    checkHealth(): string {
        return 'ok';
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        console.log('Received DTO:', createUserDto); // Log received data

        try {
            const user = await this.userService.create(createUserDto);
            return { id: user.id, username: user.username };
        } catch (error) {
            console.error('Error:', error); // Error log
            throw new HttpException({
                message: 'An error occurred',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint to get list of users
    @Get('list')
    async list() {
        return await this.userService.findAll();
    }
}
