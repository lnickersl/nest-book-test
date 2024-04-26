import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Author} from './Author';
import {AuthorBook} from './AuthorBook';
import {OrderItem} from './OrderItem';

@Table({ tableName: 'books' })
export class Book extends Model<Book> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "The Silmarillion", description: 'Name of the book' })
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @ApiProperty({ example: 9900, description: 'Price of the book in cents' })
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    price!: number;

    @ApiProperty({ example: 1, description: 'Order Item ID' })
    @ForeignKey(() => OrderItem)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    orderItemId!: number;

    @BelongsTo(() => OrderItem)
    orderItem: OrderItem;

    @BelongsToMany(() => Author, {
        through: {
            model: () => AuthorBook,
        },
    })
    authors: Author[];
}