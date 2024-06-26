import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Length} from 'class-validator';

const MIN_STRING = 6;
const MAX_STRING = 32;

export class CreateAuthorDto {
    @ApiProperty({ example: "John Ronald Reuel Tolkien", description: 'Full name of the author' })
    @IsNotEmpty()
    @Length(MIN_STRING, MAX_STRING, { message: `field 'full_name' must be between ${MIN_STRING} and ${MAX_STRING} characters` })
    @IsString({ message: "field 'full_name' must be string" })
    full_name!: string;
}