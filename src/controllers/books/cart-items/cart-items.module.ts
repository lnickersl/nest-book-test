import { Module } from '@nestjs/common';
import {CartItemsController} from './cart-items.controller';
import {CartItemsService} from './cart-items.service';
import {CartItem} from '../../../models/CartItem';
import {SequelizeModule} from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forFeature([CartItem]),
    ],
    providers: [CartItemsService],
    controllers: [CartItemsController]
  })
export class CartItemsModule {}
