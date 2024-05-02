import { Injectable } from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {InjectConnection, InjectModel} from '@nestjs/sequelize';
import {Book} from '../../models/Book';
import {Sequelize} from 'sequelize-typescript';
import {Author} from '../../models/Author';
import {AuthorBook} from '../../models/AuthorBook';
import {SearchBookDto} from './dto/search-book.dto';
import {Op} from 'sequelize';

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

            const foundAuthors = await this.authorRepository.findAll({ where: { full_name: authors }, transaction });

            for (let name of authors) {
                let author = foundAuthors.find((found) => found.full_name === name);

                if (!author) {
                    author = await this.authorRepository.create({ full_name: name }, { transaction });
                }

                await book.$add('author', author, { through: AuthorBook,  transaction });
            }

            return book;
        });
    }

    async getAllBooks() {
        const books = await this.bookRepository.findAll({ include: [
            { 
                model: Author, 
                attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                through: { attributes: [] }, 
            },
        ] });
        return books;
    }

    async searchBooks({ query }: SearchBookDto) {
        const orders = await this.bookRepository.findAll({ 
            where: { [Op.or]: {
                _search:  { [Op.match]: Sequelize.fn('to_tsquery', query) }, 
                '$authors._search$':  { [Op.match]: Sequelize.fn('to_tsquery', query) }, 
            }}, 
            include: [Author], 
        });

        return orders;
    }
}
