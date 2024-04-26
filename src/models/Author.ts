import {AllowNull, BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {Book} from './Book';
import {AuthorBook} from './AuthorBook';
import {CreateAuthorsDto} from '../controllers/authors/dto/create-author.dto';

@Table({ tableName: 'authors' })
export class Author extends Model<Author, CreateAuthorsDto> {
    
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "John Ronald Reuel Tolkien", description: 'Full name of the author' })
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    fullName!: string;

    @BelongsToMany(() => Book, {
        through: {
            model: () => AuthorBook,
        },
    })
    books: Book[];
}

