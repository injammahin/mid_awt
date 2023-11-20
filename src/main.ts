import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use cookie-parser middleware
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Finance and Billing Automation')
    .setDescription('finance and billing API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.enableCors();
  await app.listen(2000);
}
bootstrap();
