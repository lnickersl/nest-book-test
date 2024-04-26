import { Body, Controller, Get, Post } from '@nestjs/common';
import {BooksService} from './books.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Book} from '../../models/Book';
import {CreateBookDto} from './dto/create-book.dto';

@ApiTags('Books endpoint')
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @ApiOperation({
        summary: 'Books creation',
    })
    @ApiResponse({ status: 200, type: Book })
    @Post()
    create(@Body() dto: CreateBookDto) {
        return this.booksService.createBook(dto);
    }

    
    @ApiOperation({
        summary: 'Pulling every book',
    })
    @ApiResponse({ status: 200, type: [Book] })
    @Get()
    getAll() {
        return this.booksService.getAllBooks();
    }
}
