import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entitys/user.entity';
import { AuthService } from './user.auth';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { PaymentController } from 'src/controller/paymentdetails.controller';

import { PaymentService } from 'src/services/paymentdetails.service';
import { PaymentAuthService } from 'src/services/payment.auth';
import { Connect_bank } from 'src/entitys/connect-bank.entity';
import { BankController } from 'src/controller/connect-bank.controller';
import { ConnectBankAuthService } from 'src/services/connect-bank.auth';
import { ConnectBankService } from 'src/services/connect-bank.service';
/////pdf
import { PdfController } from 'src/pdf/pdf.controller';
import { PdfService } from 'src/pdf/pdf.service';
/////excel
import { ExcelController } from 'src/excel/xcel.controller';
import { ExcelService } from 'src/excel/excel.controller';
///jwt
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/JWT/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payment, Connect_bank]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    UsersController,
    PaymentController,
    BankController,
    PdfController,
    ExcelController,
  ],
  providers: [
    UsersService,
    AuthService,
    PaymentService,
    PaymentAuthService,
    ConnectBankService,
    ConnectBankAuthService,
    PdfService,
    ExcelService,
    ////
    AuthService,
    JwtStrategy,
  ],
})
export class UsersModule {}
