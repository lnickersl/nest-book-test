import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/sequelize';
import {Sequelize} from 'sequelize-typescript';
import {Order} from '../../models/Order';
import {CreateOrderDto} from './dto/create-order.dto';
import {CartItem} from '../../models/CartItem';

import {OrderItem} from '../../models/OrderItem';

@Injectable()
export class OrdersService {
    constructor(
        @InjectConnection() private readonly sequelize: Sequelize,
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(CartItem) private cartItemRepository: typeof CartItem,
        @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
    ) {}

    async createOrder({ ordererId }: CreateOrderDto) {
        return this.sequelize.transaction(async (transaction) => {
            const cartItems = await this.cartItemRepository.findAll({ where: { ownerId: ordererId }, transaction });

            if (!cartItems || cartItems.length === 0) {
                throw new BadRequestException('Cart is empty');
            }

            const order = await this.orderRepository.create({ ordererId }, { transaction });

            for (let { id, quantity, bookId } of cartItems) {
                const orderItem = await this.orderItemRepository.create({ quantity, bookId, orderId: order.id }, { transaction });

                await this.cartItemRepository.destroy({ where: { id }, transaction });
            }

            const fullOrder = await this.orderRepository.findByPk(order.id, { include: OrderItem, transaction });

            return fullOrder;
        });
    }

    async getAllOrders({ ordererId }: CreateOrderDto) {
        const orders = await this.orderRepository.findAll({ where: { ordererId } });
        return orders;
    }
}
