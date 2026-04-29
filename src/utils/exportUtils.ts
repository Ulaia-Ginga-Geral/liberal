import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (title: string, headers: string[][], data: any[][], fileName: string) => {
  const doc = new jsPDF();
  
  // Título e Estilo PL
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text('PARTIDO LIBERAL - CUANZA SUL', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(title, 14, 30);
  doc.text(`Data de Emissão: ${new Date().toLocaleDateString()}`, 14, 37);

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 45,
    styles: { fontSize: 9, font: 'helvetica' },
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 215, 0] }, // Black and Gold
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save(`${fileName}.pdf`);
};
