import {IsInt, IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    ordererId: number;
}