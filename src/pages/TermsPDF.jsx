import { useEffect } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function TermsPDF() {
  useEffect(() => {
    generatePDF();
  }, []);

  const loadFont = async (doc, path, name, style) => {
    const res = await fetch(path);
    const buffer = await res.arrayBuffer();

    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    doc.addFileToVFS(name, base64);
    doc.addFont(name, "THSarabun", style);
  };

  const loadLogo = async () => {
    const res = await fetch("/logo.png");
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 25;
    const pageWidth = 210;
    const pageHeight = 297;
    let y = 30;

    // ===== โหลดฟอนต์ =====
    await loadFont(doc, "/fonts/THSarabunNew.ttf", "THSarabunNew.ttf", "normal");
    await loadFont(doc, "/fonts/THSarabunNew-Bold.ttf", "THSarabunNew-Bold.ttf", "bold");
    await loadFont(doc, "/fonts/THSarabunNew-Italic.ttf", "THSarabunNew-Italic.ttf", "italic");
    await loadFont(doc, "/fonts/THSarabunNew-BoldItalic.ttf", "THSarabunNew-BoldItalic.ttf", "bolditalic");

    doc.setFont("THSarabun", "normal");

    // ===== LOGO =====
    const logoBase64 = await loadLogo();
    doc.addImage(logoBase64, "PNG", margin, 20, 25, 25);

    // ===== WATERMARK =====
    doc.setFontSize(60);
    doc.setTextColor(230);
    doc.text("OFFICIAL", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45,
    });

    doc.setTextColor(0);

    // ===== HEADER =====
    doc.setFont("THSarabun", "bold");
    doc.setFontSize(20);
    doc.text("บริษัท คาร์เรนทัล จำกัด", pageWidth / 2, y, { align: "center" });

    y += 10;
    doc.setFontSize(18);
    doc.text("เอกสารเงื่อนไขการเช่ารถ", pageWidth / 2, y, { align: "center" });

    y += 10;
    doc.setFont("THSarabun", "normal");
    doc.setFontSize(14);
    doc.text(
      `วันที่ออกเอกสาร: ${new Date().toLocaleDateString("th-TH")}`,
      pageWidth / 2,
      y,
      { align: "center" }
    );

    y += 15;
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    // ===== CONTENT =====
    const content = [
      { text: "1. เงื่อนไขการเช่า", style: "bold" },
      { text: "     1.1 ชั่วโมงในการเช่า 24 ชั่วโมง ฟรีเกินได้ 1 ชั่วโมง" },
      { text: "     1.2 ส่งรถช้า ปรับ 100 บาท ต่อ 1 ชั่วโมง" },
      { text: "     1.3 ส่งรถช้าเกิน 5 ชั่วโมง คิดเป็น 1 วัน" },
      { text: "     1.4 ผู้ขับขี่ต้องทำเอกสารด้วยตนเองเท่านั้น" },
      { text: "     1.5 เอกสารต้องเป็นบุคคลเดียวกับผู้ทำสัญญา" },
      { text: "     1.6 ฟรีค่ามัดจำ เมื่อแสดงตั๋วเครื่องบิน" },
      { text: "" },
      { text: "2. เอกสารหลักฐานการเช่ารถ", style: "bold" },
      { text: "     2.1 สำเนาบัตรประชาชน" },
      { text: "     2.2 สำเนาใบขับขี่" },
    ];

    doc.setFontSize(16);

    content.forEach((item) => {
      doc.setFont("THSarabun", item.style === "bold" ? "bold" : "normal");

      const lines = doc.splitTextToSize(item.text, pageWidth - margin * 2);

      lines.forEach((line) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          y = 30;
        }

        doc.text(line, margin, y);
        y += 8;
      });
    });

    // ===== QR VERIFY =====
    const verifyURL = "https://yourdomain.com/verify/TERMS-001";
    const qrDataURL = await QRCode.toDataURL(verifyURL);

    doc.addImage(qrDataURL, "PNG", pageWidth - 45, pageHeight - 45, 25, 25);
    doc.setFontSize(12);
    doc.text("สแกนเพื่อตรวจสอบเอกสาร", pageWidth - 45, pageHeight - 15);

    // ===== FOOTER =====
    doc.setFontSize(12);
    doc.text(
      "เอกสารฉบับนี้เป็นเอกสารทางการของบริษัท",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    doc.save("Car-Rental-Terms.pdf");
  };

  return null;
}