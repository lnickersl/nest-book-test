import { Controller, Get, Post, Query } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {OrdersService} from './orders.service';
import {Order} from '../../models/Order';
import {SearchOrderDto} from './dto/search-order.dto';

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

    @ApiOperation({ summary: 'Search orders by book or author name' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/search')
    search(@Query() { query }: Omit<SearchOrderDto, 'ordererId'>) {
        return this.ordersService.searchOrders({ ordererId: +process.env.USER_ID, query });
    }
}
