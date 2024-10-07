import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    MinLength, 
    Matches, 
    Min
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'ID must be at least 2 characters.' })
    id: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Username must be at least 3 characters.' })
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/(?=.*[0-9])/, { message: 'Password must contain at least one digit.' })
    password: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email.' })
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(male|female|other)$/i, { message: 'Gender must be "male", "female", or "other".' })
    gender: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{10}$/, { message: 'Phone number must be 10 digits.' })
    phonenumber: string;
  
    @IsNotEmpty()
    @IsNumber({}, { message: 'Age must be a number.' })
    @Min(18, { message: 'Age must be greater than or equal to 18'})
    age: number;
  }
  