import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CartItemsService} from './cart-items.service';
import {CartItem} from '../../models/CartItem';
import {ParamIdDto} from '../../helpers/dto/paramId.dto';
import {CreateCartItemDto} from './dto/create-cart-item.dto';

@ApiTags('Cart endpoint')
@Controller('cart')
export class CartItemsController {
    constructor(private cartItemsService: CartItemsService) {}

    @ApiOperation({ summary: 'Create cart item' })
    @ApiResponse({ status: 200, type: CartItem })
    @Post()
    create(@Body() { bookId, quantity }: Omit<CreateCartItemDto, 'ownerId'>) {
        return this.cartItemsService.addToCart({ bookId, ownerId: +process.env.USER_ID, quantity });
    }

    @ApiOperation({ summary: 'Get all cart items' })
    @ApiResponse({ status: 200, type: [CartItem] })
    @Get()
    getAll() {
        return this.cartItemsService.getAllCartItems({ ownerId: +process.env.USER_ID });
    }

    @ApiOperation({ summary: 'Delete cart item' })
    @ApiResponse({ status: 200, type: Number })
    @Delete()
    delete(@Param() params: ParamIdDto) {
        return this.cartItemsService.deleteCartItem({ bookId: params.id, ownerId: +process.env.USER_ID });
    }

    @ApiOperation({ summary: 'Empty shopping cart' })
    @ApiResponse({ status: 200, type: Number })
    @Get('/empty')
    empty() {
        return this.cartItemsService.emptyCart({ ownerId: +process.env.USER_ID });
    }
}
