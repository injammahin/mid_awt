// pdf.service.ts
import { Injectable } from '@nestjs/common';
import { ConnectBankService } from 'src/services/connect-bank.service';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  constructor(private readonly ConnectBankService: ConnectBankService) {}

  async generatePdf(): Promise<Buffer> {
    const examples = await this.ConnectBankService.findAll();

    // Create a PDF document
    const doc = new PDFDocument();

    // Customize the content based on your data (for simplicity, just adding JSON here)
    doc.text(JSON.stringify(examples, null, 2));

    // Return the PDF as a Buffer
    return new Promise<Buffer>((resolve) => {
      const chunks: any[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.end();
    });
  }
}
