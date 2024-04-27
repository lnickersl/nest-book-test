import {IsInt, IsNotEmpty, IsString, Length} from 'class-validator';

export class SearchBookDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    query: string;
}