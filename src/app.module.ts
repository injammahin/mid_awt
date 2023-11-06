import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './registration/users.module';
// import { UsersController } from './registration/users.controller';
// import { UsersService } from './registration/users.service';
import { User } from './registration/user.entity';
import { ManageCModule } from './manage-c/manage-c.module';

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
    ManageCModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
