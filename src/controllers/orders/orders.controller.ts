import { Controller, Get, Post } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {OrdersService} from './orders.service';
import {Order} from '../../models/Order';

@ApiTags('Orders endpoint')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Create order' })
    @ApiResponse({ status: 200, type: Order })
    @Post()
    create() {
        return this.ordersService.createOrder({ ordererId: +process.env.USER_ID });
    }

    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get()
    getAll() {
        return this.ordersService.getAllOrders({ ordererId: +process.env.USER_ID });
    }
}
