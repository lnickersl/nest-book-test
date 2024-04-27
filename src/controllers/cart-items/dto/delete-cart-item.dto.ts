import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, Min} from 'class-validator';

export class DeleteCartItemDto {
    @ApiProperty({ example: 1, description: 'Book ID' })
    @IsNotEmpty()
    @IsInt()
    bookId!: number;

    @ApiProperty({ example: 1, description: 'Book ID' })
    @IsNotEmpty()
    @IsInt()
    ownerId!: number;
}