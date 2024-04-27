import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, Min} from 'class-validator';

export class CreateCartItemDto {
    @ApiProperty({ example: 1, description: 'Book ID' })
    @IsNotEmpty()
    @IsInt()
    bookId!: number;

    @ApiProperty({ example: 1, description: 'Book ID' })
    @IsNotEmpty()
    @IsInt()
    ownerId!: number;

    @ApiProperty({ example: 2, description: 'Number of books of this type' })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;
}