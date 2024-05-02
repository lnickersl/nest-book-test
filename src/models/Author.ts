import {AllowNull, BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {Book} from './Book';
import {AuthorBook} from './AuthorBook';
import {CreateAuthorDto} from '../controllers/authors/dto/create-author.dto';

@Table({ tableName: 'authors' })
export class Author extends Model<Author, CreateAuthorDto> {
    
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
        unique: true,
        type: DataType.STRING,
    })
    full_name!: string;

    @ApiProperty({ example: "'jhon':1 'ronald':2 'renuel':3 'tolkien':4", description: 'Search keys' })
    @Column({
        type: DataType.TSVECTOR,
    })
    _search: string;

    @BelongsToMany(() => Book, {
        through: {
            model: () => AuthorBook,
        },
    })
    books: Book[];
}

