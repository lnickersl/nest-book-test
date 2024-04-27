import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {BooksService} from './books.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Book} from '../../models/Book';
import {CreateBookDto} from './dto/create-book.dto';
import {SearchBookDto} from './dto/search-book.dto';

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

    @ApiOperation({ summary: 'Search books by name or author' })
    @ApiResponse({ status: 200, type: [Book] })
    @Get('/search')
    search(@Query() dto: SearchBookDto) {
        return this.booksService.searchBooks(dto);
    }
}
