import {AllowNull, Column, DataType, HasMany, IsEmail, Model, Table, Unique} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Order} from './Order';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "DemonPhoenix5454", description: 'User name' })
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name!: string;

    @ApiProperty({ example: "dima.berezin@mail.ru", description: 'User email' })
    @AllowNull(false)
    @IsEmail
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email!: string;

    @ApiProperty({ example: "dima5454%$_123", description: 'User passwrod' })
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    password!: string;

    @HasMany(() => Order)
    orders: Order[];
}