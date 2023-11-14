import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Client } from 'pg';

@Injectable()
export class ExcelService {
  async generateExcel(): Promise<Uint8Array> {
    const data = await this.fetchDataFromDatabase(); // Fetch your data from the PostgreSQL database

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Write the Excel file to a buffer
    const buffer: Uint8Array = await XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    return buffer;
  }

  private async fetchDataFromDatabase(): Promise<any[]> {
    // Replace this with your actual database query logic
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'registration',
      password: '2023',
      port: 5433,
    });

    await client.connect();
    const result = await client.query('SELECT * FROM Connect_bank');
    await client.end();

    return result.rows;
  }
}
