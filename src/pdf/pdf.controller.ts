// pdf.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('download pdf')
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async downloadPdf(@Res() res: Response): Promise<void> {
    const pdfBuffer = await this.pdfService.generatePdf();

    // Set appropriate headers for the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');

    // Send the PDF as the response
    res.send(pdfBuffer);
  }
}
