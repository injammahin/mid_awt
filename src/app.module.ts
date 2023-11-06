import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';

import { UsersModule } from './registration/users.module';
// import { UsersController } from './registration/users.controller';
// import { UsersService } from './registration/users.service';
import { User } from './entitys/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '2023',
      database: 'registration',
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
