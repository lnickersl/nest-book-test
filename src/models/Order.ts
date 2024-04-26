import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {OrderItem} from './OrderItem';
import {User} from './User';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 1, description: 'Orderer ID' })
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    ordererId!: number;

    @BelongsTo(() => User)
    orderer!: User;

    @HasMany(() => OrderItem)
    items: OrderItem[];
}