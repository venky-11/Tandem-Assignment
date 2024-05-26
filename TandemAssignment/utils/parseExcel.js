// utils/parseExcel.js
import * as XLSX from 'xlsx';

export const parseExcelFile = async (file) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Assuming your data structure: [timestamp, latitude, longitude]
  return json.slice(1).map(row => ({
    timestamp: new Date(row[0]),
    latitude: row[1],
    longitude: row[2]
  }));
};
