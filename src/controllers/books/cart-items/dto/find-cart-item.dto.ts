import {IsInt, IsNotEmpty} from 'class-validator';

export class FindCartItemDto {
    @IsNotEmpty()
    @IsInt()
    ownerId: number;
}