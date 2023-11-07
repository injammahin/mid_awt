import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entitys/user.entity';
// import { Consultant } from '../consultant/consultant.entity';
import { AuthService } from './user.auth';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { PaymentController } from 'src/controller/paymentdetails.controller';

import { PaymentService } from 'src/services/paymentdetails.service';
import { PaymentAuthService } from 'src/services/payment.auth';
// import { EmailService } from 'src/email/email.service';
// import { ConsultantService } from 'src/consultant/consultant.service';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { MessageService } from 'src/message/msg.service';
// import { Message } from 'src/message/msg.entity';
// import { ScheduleService } from 'src/schedule/shedule.service';
// import { Schedule } from 'src/schedule/schedule.entity';
// import { ScheduleController } from 'src/schedule/schedule.controller';
// import { ConsultantController } from 'src/consultant/consultant.controller';
// import { ScholarshipController } from 'src/university-details/scholarship.controllar';
// import { ScholarshipService } from 'src/university-details/scholarship.service';
// import { Scholarship } from 'src/university-details/scholarship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Payment,
      //   Consultant,
      //   Message,
      //   Schedule,
      //   Scholarship,
      //
    ]),
    // MailerModule.forRoot({
    //   transport: {
    //     port: 465,
    //     host: 'smtp.gmail.com',
    //     auth: {
    //       user: 'akraju7575@gmail.com',
    //       pass: 'qwssozvnqlilcovn',
    //     },
    //   },
    // }),
  ],
  controllers: [
    UsersController,
    PaymentController,

    // ScheduleController,
    // ConsultantController,
    // ScholarshipController,
  ],
  providers: [
    UsersService,
    AuthService,
    PaymentService,
    PaymentAuthService,
    //   EmailService,
    //   ConsultantService,
    //   MessageService,
    //   ScheduleService,
    //   ScholarshipService,
    //
  ],
})
export class UsersModule {}
