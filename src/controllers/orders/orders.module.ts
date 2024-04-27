import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {Order} from '../../models/Order';
import {SequelizeModule} from '@nestjs/sequelize';
import {CartItem} from '../../models/CartItem';
import {OrderItem} from '../../models/OrderItem';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, CartItem, OrderItem]),
    ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
