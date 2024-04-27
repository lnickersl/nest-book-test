import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Book} from '../../models/Book';
import {Author} from '../../models/Author';
import {CartItemsModule} from './cart-items/cart-items.module';

@Module({
    controllers: [BooksController],
    providers: [BooksService],
    imports: [
        SequelizeModule.forFeature([Book, Author]),
        CartItemsModule,
    ],
})
export class BooksModule {}
