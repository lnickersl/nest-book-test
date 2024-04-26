import { Body, Controller, Post } from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Author} from '../../models/Author';
import {CreateAuthorsDto} from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({
        summary: 'User creation',
    })
    @ApiResponse({ status: 200, type: Author })
    @Post()
    create(@Body() dto: CreateAuthorsDto) {
        return this.authorsService.createAuthor(dto);
    }
}
