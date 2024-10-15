import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
// import { v4 as uuidv4 } from 'uuid'; // Use UUID library to generate id

@Injectable()
export class UserService {
  private users = []; // User storage array
  private currentId = 0; // Initialize the current ID

  // Password encryption function
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Create salt with 10 rounds
    return await bcrypt.hash(password, salt); // Encrypt password
  }

  // Function to check if username exists
  async isUsernameTaken(username: string): Promise<boolean> {
    const user = this.users.find((user) => user.username === username); // Check username in users array
    return !!user; // Returns true if user exists, false otherwise
  }

  //New User Creation Function
  async create(createUserDto: CreateUserDto) {
    //Check if username is duplicated
    if (await this.isUsernameTaken(createUserDto.username)) {
      throw new HttpException(
        'Username already exists, please choose another username.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Encrypt passwords and create new users
    const newUser = {
      // id: uuidv4(),
      id: this.currentId++,
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password), // Hash password
    };

    this.users.push(newUser); // Add users to the array
    return newUser; // Returns the newly created user
  }

  // Function returns list of users
  async findAll() {
    return this.users; // Returns the list of users
  }
}
