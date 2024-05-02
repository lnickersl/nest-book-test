import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Author} from './Author';
import {AuthorBook} from './AuthorBook';
import {OrderItem} from './OrderItem';
import {Order} from './Order';
import {User} from './User';
import {CartItem} from './CartItem';

interface BookCreationAttributes {
    name: string;
    price: number;
};

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttributes> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'The Silmarillion', description: 'Name of the book' })
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name!: string;

    @ApiProperty({ example: 9900, description: 'Price of the book in cents' })
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    price!: number;

    @ApiProperty({ example: "'the':1 'silmarillion':2", description: 'Search keys' })
    @Column({
        type: DataType.TSVECTOR,
    })
    _search: string;

    @BelongsToMany(() => User, {
        through: {
            model: () => CartItem,
        },
    })
    users: User[];

    @BelongsToMany(() => Order, {
        through: {
            model: () => OrderItem,
        },
    })
    orders: Order[];

    @BelongsToMany(() => Author, {
        through: {
            model: () => AuthorBook,
        },
    })
    authors: Author[];
}