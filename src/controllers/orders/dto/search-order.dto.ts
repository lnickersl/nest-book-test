import {IsInt, IsNotEmpty, IsString, Length} from 'class-validator';

export class SearchOrderDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    query: string;

    @IsNotEmpty()
    @IsInt()
    ordererId: number;
}