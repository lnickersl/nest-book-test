import { Body, Controller, Get, Post } from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Author} from '../../models/Author';
import {CreateAuthorDto} from './dto/create-author.dto';

@ApiTags('Authors endpoint')
@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({
        summary: 'Author creation',
    })
    @ApiResponse({ status: 200, type: Author })
    @Post()
    create(@Body() dto: CreateAuthorDto) {
        return this.authorsService.createAuthor(dto);
    }

    @ApiOperation({
        summary: 'Pulling every author',
    })
    @ApiResponse({ status: 200, type: [Author] })
    @Get()
    getAll() {
        return this.authorsService.getAllAuthors();
    }
}
