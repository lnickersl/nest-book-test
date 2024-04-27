import {AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {User} from './User';
import {Book} from './Book';

interface CartItemCreationAttributes {
    quantity: number;
    ownerId: number;
    bookId: number;
}

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem, CartItemCreationAttributes> {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 2, description: 'Number of books of this type' })
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    quantity!: number;

    @ApiProperty({ example: 1, description: 'Cart owner ID' })
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User;

    @ApiProperty({ example: 1, description: 'Book ID' })
    @ForeignKey(() => Book)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    bookId!: number;

    @BelongsTo(() => Book)
    book!: Book;
}