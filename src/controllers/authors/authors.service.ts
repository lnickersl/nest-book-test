import { Injectable } from '@nestjs/common';
import {CreateAuthorsDto} from './dto/create-author.dto';
import {InjectModel} from '@nestjs/sequelize';
import {Author} from '../../models/Author';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

    async createAuthor(dto: CreateAuthorsDto) {
        const author = await this.authorRepository.create(dto);
        return author;
    }
}
