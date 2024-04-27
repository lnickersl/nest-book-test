import {IsInt, IsNotEmpty} from 'class-validator';

export class ParamIdDto {
    @IsNotEmpty()
    @IsInt()
    id: number;
}