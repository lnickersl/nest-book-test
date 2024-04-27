import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe({ 
        stopAtFirstError: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }, }));

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Books test')
        .setDescription('The Books test API description')
        .setVersion('1.0')
        .addTag('books')
        .build();
        
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();