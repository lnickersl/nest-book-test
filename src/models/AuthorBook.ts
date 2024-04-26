import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import {Author} from './Author';
import {Book} from './Book';
import {ApiProperty} from '@nestjs/swagger';

@Table({ timestamps: false, tableName: 'authors_books' })
export class AuthorBook extends Model<AuthorBook> {
    @ApiProperty({ example: 1, description: 'Author ID' })
    @ForeignKey(() => Author)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    authorId!: number;

    @BelongsTo(() => Author)
    author!: Author;

    @ApiProperty({ example: 1, description: 'Book ID' })
    @ForeignKey(() => Book)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    bookId!: number;

    @BelongsTo(() => Book)
    book!: Book;
}