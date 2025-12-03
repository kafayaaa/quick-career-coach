import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { AnalysisResult } from "../types/analysisResult";

export const downloadPDF = async (req: Request, res: Response) => {
  try {
    const data = req.body as AnalysisResult;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cv-analysis.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("CV Analysis Result", { align: "center" });
    doc.moveDown(1);

    // Missing Sections
    doc.fontSize(16).text("Missing Sections:");
    doc.fontSize(12);
    data.missingSections.forEach((section: string) => {
      doc.text(`• ${section}`);
    });
    doc.moveDown();

    // Scores
    doc.fontSize(16).text("Scores:");
    doc.fontSize(12);

    Object.entries(data.scores).forEach(([key, val]) => {
      const detail = val as { score: number; justification: string };
      doc.text(`${key}: ${detail.score} — ${detail.justification}`);
    });
    doc.moveDown();

    // Suggestions
    doc.fontSize(16).text("Suggestions:");
    doc.fontSize(12);

    data.suggestions.forEach((s: any, i: number) => {
      doc.text(`${i + 1}. Priority: ${s.priority}`);
      doc.text(`   Issue: ${s.issue}`);
      doc.text(`   Suggestion: ${s.suggestion}`);
      doc.text(`   Example: ${s.example}`);
      doc.moveDown();
    });

    // Summary
    doc.fontSize(16).text("Summary:");
    doc.fontSize(12);
    data.summary.forEach((summary: string) => {
      doc.text(`• ${summary}`);
    });

    doc.end();
  } catch (error) {
    console.error("PDF error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
