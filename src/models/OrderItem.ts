import {AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Order} from './Order';
import {Book} from './Book';

interface OrderItemCreationAttributes {
    quantity: number;
    orderId: number;
    bookId: number;
}

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttributes> {
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

    @ApiProperty({ example: 1, description: 'Order ID' })
    @ForeignKey(() => Order)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @ApiProperty({ example: 1, description: 'Book ID' })
    @ForeignKey(() => Book)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    bookId!: number;

    @BelongsTo(() => Book)
    book!: Book;
}