import * as Excel from "exceljs";
import * as fs from "file-saver";

export async function exportToExcel({
  data,
  filename,
  worksheetName = "Sheet1",
  columns,
  headerStyle = {
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2193B3' }
    },
    font: {
      color: { argb: 'FFFFFF' },
      bold: true
    },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  },
  rowStyle = {
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  }
}) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  // Configure columns
  worksheet.columns = columns.map(col => ({
    header: col.header,
    key: col.key,
    width: col.width || 15
  }));

  // Apply header styles
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell(cell => {
    Object.assign(cell, { style: headerStyle });
  });

  // Add data rows
  data.forEach(item => {
    const rowData = columns.map(col => {
      const value = item[col.key];
      return col.format ? col.format(value) : value;
    });

    const row = worksheet.addRow(rowData);
    
    // Apply row styles
    row.eachCell(cell => {
      Object.assign(cell, { style: rowStyle });
      
      // Auto-wrap text for long content
      if (typeof cell.value === 'string' && cell.value.length > 50) {
        cell.alignment = { wrapText: true };
      }
    });
  });

  // Generate and download file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  fs.saveAs(blob, `${filename}.xlsx`);
}