import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Book} from '../../models/Book';
import {Author} from '../../models/Author';

@Module({
    imports: [
        SequelizeModule.forFeature([Book, Author]),
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
