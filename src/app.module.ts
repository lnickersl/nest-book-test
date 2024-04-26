import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';
import { BooksModule } from './controllers/books/books.module';
import { AuthorsModule } from './controllers/authors/authors.module';
import { UsersService } from './controllers/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersModule } from './controllers/users/users.module';
import {Author} from './models/Author';
import {User} from './models/User';
import {Book} from './models/Book';
import {AuthorBook} from './models/AuthorBook';
import {Order} from './models/Order';
import {OrderItem} from './models/OrderItem';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          models: [User, Author, Book, AuthorBook, Order, OrderItem],
          autoLoadModels: true,
        }),
        BooksModule,
        AuthorsModule,
        UsersModule,
    ],
    
})
export class AppModule {}