import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        const fileName = 'ThinkTank_Sponsor_Data.xlsx';
        const filePath = path.join(process.cwd(), fileName);

        let wb: XLSX.WorkBook;
        let ws: XLSX.WorkSheet;

        if (fs.existsSync(filePath)) {
            // Read existing file
            const fileBuffer = fs.readFileSync(filePath);
            wb = XLSX.read(fileBuffer, { type: 'buffer' });

            // Get the first sheet name
            const sheetName = wb.SheetNames[0];
            ws = wb.Sheets[sheetName];

            // Convert current sheet data to JSON to append new row
            const currentData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

            // Append new data
            currentData.push([name, email, phone, new Date().toISOString()]);

            // Create new sheet with updated data
            const newWs = XLSX.utils.aoa_to_sheet(currentData);
            wb.Sheets[sheetName] = newWs;
        } else {
            // Create new workbook and sheet
            wb = XLSX.utils.book_new();
            const wsData = [
                ['Name', 'Email', 'Phone', 'Timestamp'], // Header
                [name, email, phone, new Date().toISOString()] // Data row
            ];
            ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, 'Sponsor Data');
        }

        // Write to file
        const writeBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
        fs.writeFileSync(filePath, writeBuffer);

        return NextResponse.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving sponsor data:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to save data' },
            { status: 500 }
        );
    }
}
