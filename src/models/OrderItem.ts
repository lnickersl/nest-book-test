import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {Order} from './Order';
import {Book} from './Book';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 1, description: 'Order ID' })
    @ForeignKey(() => Order)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @HasOne(() => Book)
    book: Book
}