import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

const MIN_STRING = 6;
const MAX_STRING = 32;

export class CreateUserDto {
    @ApiProperty({ minLength: MIN_STRING, maxLength: MAX_STRING, example: "DemonPhoenix5454", description: 'User name' })
    @IsNotEmpty()
    @Length(MIN_STRING, MAX_STRING, { message: `field 'name' must be between ${MIN_STRING} and ${MAX_STRING} characters` })
    @IsString({ message: "field 'firstName' must be string" })
    name!: string;

    @ApiProperty({ example: "dima.berezin@mail.ru", description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: "dima5454%$_123", description: 'User password' })
    @IsNotEmpty()
    @Length(MIN_STRING, MAX_STRING, { message: `field 'password' must be between ${MIN_STRING} and ${MAX_STRING} characters` })
    password!: string;
}