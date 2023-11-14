import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

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
  await app.listen(2000);
}
bootstrap();
