import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from 'src/services/paymentdetails.service';
import { CreatepaymentDto } from 'src/dtos/payment-details.dto';
import { PaymentAuthService } from 'src/services/payment.auth';
import { updateDetailsDto } from 'src/dtos/update.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import multer, { diskStorage } from 'multer';
@Controller('payment')
export class PaymentController {
  constructor(
    private PaymentService: PaymentService,
    private PaymentAuthService: PaymentAuthService,
  ) {}

  @Post('/fillup')
  async createUser(@Body() body: CreatepaymentDto, @Session() session: any) {
    const payment = await this.PaymentAuthService.fillup(
      body.paymentway,
      body.reference,
      body.amount,
      body.due,
    );
    return payment;
  }

  @Post('/:id')
  findUser(@Param('id') id: string) {
    return this.PaymentService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.PaymentService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateDetailsDto) {
    return this.PaymentService.update(parseInt(id), body);
  }

  @Put('/payment-slip/upload/:id')
  @UseInterceptors(
    FileInterceptor('payslip', {
      storage: diskStorage({
        destination: './uploads/paymentDetails',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadSlip(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() data,
  ): any {
    data.payslip = file.filename;
    return this.PaymentService.update(id, data);
  }
  @Get('/getslip/:name')
  // @UseGuards(SessionGuardP)
  getSlip(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads/paymentDetails' });
  }
}
