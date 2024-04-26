import { Body, Controller, Get, Post } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from '../../models/User';

@ApiTags('Users endpoint')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({
        summary: 'User creation',
    })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({
        summary: 'Pulling every user',
    })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
