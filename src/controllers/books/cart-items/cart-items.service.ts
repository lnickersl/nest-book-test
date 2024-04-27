import { Injectable } from '@nestjs/common';
import {CreateCartItemDto} from './dto/create-cart-item.dto';
import {InjectModel} from '@nestjs/sequelize';
import {CartItem} from '../../../models/CartItem';
import {DeleteCartItemDto} from './dto/delete-cart-item.dto';
import {ParamIdDto} from '../../../helpers/dto/paramId.dto';
import {FindCartItemDto} from './dto/find-cart-item.dto';

@Injectable()
export class CartItemsService {
    constructor(@InjectModel(CartItem) private cartItemRepository: typeof CartItem) {}

    async addToCart(dto: CreateCartItemDto) {
        const cartItem = await this.cartItemRepository.create(dto);
        return cartItem;
    }

    async getAllCartItems({ ownerId }: FindCartItemDto) {
        const cartItems = await this.cartItemRepository.findAll({ where: { ownerId } });
        return cartItems;
    }
 
    async deleteCartItem(dto: DeleteCartItemDto) {
        const deleted = await this.cartItemRepository.destroy({ where: { ...dto } });
        return deleted;
    }

    async emptyCart({ ownerId }: FindCartItemDto) {
        const deleted = await this.cartItemRepository.destroy({ where: { ownerId } });
        return deleted;
    }
}
