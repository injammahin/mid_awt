import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.controller';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  async downloadExcel(@Res() res: Response) {
    const buffer = await this.excelService.generateExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=your_filename.xlsx',
    );
    res.send(Buffer.from(buffer));
  }
}
