import { Injectable } from '@nestjs/common';
import {CreateAuthorDto} from './dto/create-author.dto';
import {InjectModel} from '@nestjs/sequelize';
import {Author} from '../../models/Author';
import {Book} from '../../models/Book';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

    async createAuthor(dto: CreateAuthorDto) {
        const author = await this.authorRepository.create(dto);
        return author;
    }

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({ include: [
            { 
                model: Book, 
                attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                through: { attributes: [] }, 
            },
        ] });
        return authors;
    }
}
