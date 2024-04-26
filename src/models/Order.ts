import {AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {OrderItem} from './OrderItem';
import {User} from './User';
import {Book} from './Book';

interface OrderCreationAttributes {
    ordererId: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttributes> {
    
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

    @BelongsToMany(() => Book, {
        through: {
            model: () => OrderItem,
        },
    })
    books: Book[];
}