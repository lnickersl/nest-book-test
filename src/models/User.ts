import {AllowNull, BelongsToMany, Column, DataType, HasMany, HasOne, IsEmail, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Order} from './Order';
import {CreateUserDto} from '../controllers/users/dto/create-user.dto';
import {Book} from './Book';
import {CartItem} from './CartItem';

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
    
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

    @BelongsToMany(() => Book, {
        through: {
            model: () => CartItem,
        },
    })
    books: Book[];

    @HasMany(() => Order)
    orders: Order[];
}