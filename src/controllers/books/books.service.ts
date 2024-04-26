import { Injectable } from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {InjectConnection, InjectModel} from '@nestjs/sequelize';
import {Book} from '../../models/Book';
import {Sequelize} from 'sequelize-typescript';
import {Author} from '../../models/Author';
import {AuthorBook} from '../../models/AuthorBook';

@Injectable()
export class BooksService {
    constructor(
        @InjectConnection() private readonly sequelize: Sequelize,
        @InjectModel(Book) private bookRepository: typeof Book,
        @InjectModel(Author) private authorRepository: typeof Author,
    ) {}

    createBook(dto: CreateBookDto) {
        const { name, price, authors } = dto;

        return this.sequelize.transaction(async transaction => {
            const book = await this.bookRepository.create({ name, price }, { transaction });

            const foundAuthors = await this.authorRepository.findAll({ where: { fullName: authors }, transaction });

            for (let name of authors) {
                let author = foundAuthors.find((found) => found.fullName === name);

                if (!author) {
                    author = await this.authorRepository.create({ fullName: name }, { transaction });
                }

                await book.$add('author', author, { through: AuthorBook,  transaction });
            }

            return book;
        });
    }

    async getAllBooks() {
        const books = await this.bookRepository.findAll();
        return books;
    }
}
