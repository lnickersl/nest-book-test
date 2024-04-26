import {ApiProperty} from '@nestjs/swagger';
import {ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

const MIN_STRING = 6;
const MAX_STRING = 32;

export class CreateBookDto {
    @ApiProperty({ example: 'Prisoners of Power', description: 'Name of the book' })
    @IsNotEmpty()
    @Length(MIN_STRING, MAX_STRING, { message: `field 'name' must be between ${MIN_STRING} and ${MAX_STRING} characters` })
    @IsString({ message: "field 'name' must be string" })
    name!: string;

    @ApiProperty({ example: 9900, description: 'Price of the book in cents' })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    price!: number;

    @ApiProperty({ example: [ 'Arkady Strugatsky', 'Boris Strugatsky' ], description: 'List of Authors of the book' })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    authors!: string[];
}