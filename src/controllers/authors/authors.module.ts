import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Author} from '../../models/Author';

@Module({
    controllers: [AuthorsController],
    providers: [AuthorsService],
    imports: [
        SequelizeModule.forFeature([Author]),
    ],
})
export class AuthorsModule {}
