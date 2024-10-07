import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto'; 

@Injectable()
export class UserService {
  private users = []; 

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Create salt with 10 rounds
    return await bcrypt.hash(password, salt); // Encrypt password
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password), // Hash password
    };

    this.users.push(newUser); // Add users to the array
    return newUser; // Returns the newly created user
  }

  async findAll() {
    return this.users; // Returns the list of users
  }
}

