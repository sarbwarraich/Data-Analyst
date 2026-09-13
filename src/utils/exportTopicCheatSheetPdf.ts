import { jsPDF } from 'jspdf';
import { Topic, Subject } from '../types/curriculum';
import { CHEAT_SHEETS } from '../data/cheatSheetsData';

export interface PdfExportOptions {
  includeOverview: boolean;
  includeConcepts: boolean;
  includeFormulas: boolean;
  includeRules: boolean;
  includeFlowchart: boolean;
  includeCode: boolean;
  includeCaseStudy: boolean;
  includeQuiz: boolean;
}

export const DEFAULT_PDF_OPTIONS: PdfExportOptions = {
  includeOverview: true,
  includeConcepts: true,
  includeFormulas: true,
  includeRules: true,
  includeFlowchart: true,
  includeCode: true,
  includeCaseStudy: true,
  includeQuiz: true,
};

export function exportTopicCheatSheetPdf(
  topic: Topic,
  subject: Subject,
  options: PdfExportOptions = DEFAULT_PDF_OPTIONS
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Helper for page break checks
  const checkAddPage = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 18) {
      doc.addPage();
      currentY = margin + 8;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 144, 156);
    doc.text(
      `M.Tech Data Analytics • ${subject.title.toUpperCase()} • ${topic.title.toUpperCase()}`,
      margin,
      margin - 2
    );
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, margin, pageWidth - margin, margin);
  };

  // 1. TOP HEADER BANNER (Page 1)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, currentY, contentWidth, 34, 2.5, 2.5, 'F');

  // Accent badge
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.roundedRect(margin + 4, currentY + 4, 38, 5.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFLINE REVISION GUIDE', margin + 6, currentY + 7.8);

  // Subject & Category
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(199, 210, 254); // indigo-200
  doc.text(
    `${subject.title}  |  Module: ${topic.category}  |  Difficulty: ${topic.difficulty}`,
    margin + 46,
    currentY + 7.8
  );

  // Topic Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(topic.title, contentWidth - 8);
  doc.text(titleLines[0], margin + 5, currentY + 18);

  // Subtitle / Date
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const exportDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  doc.text(
    `Official Syllabus Curriculum Cheat Sheet  •  Generated for Offline Study (${exportDate})`,
    margin + 5,
    currentY + 28
  );

  currentY += 38;

  // Section Header Helper
  const drawSectionHeader = (title: string, tag?: string) => {
    checkAddPage(12);
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(margin, currentY, contentWidth, 7, 1.5, 1.5, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, 7, 1.5, 1.5, 'S');

    doc.setFillColor(79, 70, 229);
    doc.rect(margin, currentY, 2.5, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin + 5, currentY + 4.8);

    if (tag) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(tag, pageWidth - margin - 4, currentY + 4.8, { align: 'right' });
    }
    currentY += 9.5;
  };

  // 2. OVERVIEW & SUMMARY
  if (options.includeOverview) {
    drawSectionHeader('1. Executive Overview & Core Objectives', 'Theoretical Framework');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(topic.summary, contentWidth - 4);
    checkAddPage(summaryLines.length * 4.2 + 4);
    doc.text(summaryLines, margin + 2, currentY + 3);
    currentY += summaryLines.length * 4.2 + 6;
  }

  // 3. KEY CONCEPTS MATRIX
  if (options.includeConcepts && topic.keyConcepts && topic.keyConcepts.length > 0) {
    drawSectionHeader('2. Syllabus Core Concepts Matrix', `${topic.keyConcepts.length} Key Competencies`);
    
    const colWidth = (contentWidth - 4) / 2;
    for (let i = 0; i < topic.keyConcepts.length; i += 2) {
      checkAddPage(9);
      // Left item
      const item1 = topic.keyConcepts[i];
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, colWidth, 7.5, 1, 1, 'FD');
      doc.setFillColor(99, 102, 241);
      doc.circle(margin + 3.5, currentY + 3.8, 1.2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      const text1 = doc.splitTextToSize(item1, colWidth - 8);
      doc.text(text1[0], margin + 7, currentY + 4.8);

      // Right item if exists
      if (i + 1 < topic.keyConcepts.length) {
        const item2 = topic.keyConcepts[i + 1];
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin + colWidth + 4, currentY, colWidth, 7.5, 1, 1, 'FD');
        doc.setFillColor(99, 102, 241);
        doc.circle(margin + colWidth + 7.5, currentY + 3.8, 1.2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(30, 41, 59);
        const text2 = doc.splitTextToSize(item2, colWidth - 8);
        doc.text(text2[0], margin + colWidth + 11, currentY + 4.8);
      }

      currentY += 9.5;
    }
    currentY += 2;
  }

  // 4. MATHEMATICAL FORMULATIONS & NOTATION
  if (options.includeFormulas && topic.formulas && topic.formulas.length > 0) {
    drawSectionHeader('3. Mathematical Formulations & Notation', 'Formula Reference');
    
    topic.formulas.forEach((f, idx) => {
      // Clean latex string
      const cleanLatex = f.latex
        .replace(/\\quad/g, '   ')
        .replace(/\\text{([^}]+)}/g, '$1')
        .replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)')
        .replace(/\\sum/g, 'Σ')
        .replace(/\\sqrt{([^}]+)}/g, '√($1)')
        .replace(/\\cdot/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\\in/g, '∈')
        .replace(/\\approx/g, '≈')
        .replace(/\\pm/g, '±')
        .replace(/\\;/g, ' ')
        .replace(/\\,/g, ' ');

      const expLines = doc.splitTextToSize(f.explanation, contentWidth - 10);
      const varCount = f.variables ? f.variables.length : 0;
      const boxHeight = 16 + expLines.length * 4 + (varCount > 0 ? varCount * 4 + 4 : 0);

      checkAddPage(boxHeight);

      // Card container
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, boxHeight - 2, 1.5, 1.5, 'FD');

      // Formula title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}. ${f.name}`, margin + 3, currentY + 5);

      // Formula Syntax Display
      doc.setFillColor(238, 242, 255); // indigo-50
      doc.setDrawColor(199, 210, 254);
      doc.roundedRect(margin + 3, currentY + 7.5, contentWidth - 6, 6, 1, 1, 'FD');
      doc.setFont('courier', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(67, 56, 202); // indigo-700
      doc.text(cleanLatex, margin + 5, currentY + 11.5);

      // Explanation
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(51, 65, 85);
      doc.text(expLines, margin + 4, currentY + 17.5);

      // Variables definition table if present
      let subY = currentY + 17.5 + expLines.length * 4;
      if (f.variables && f.variables.length > 0) {
        f.variables.forEach((v) => {
          doc.setFont('courier', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(79, 70, 229);
          doc.text(`• ${v.symbol}:`, margin + 5, subY);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          doc.text(v.meaning, margin + 22, subY);
          subY += 4;
        });
      }

      currentY += boxHeight + 2;
    });
  }

  // 5. DIAGNOSTIC RULES & RULES OF THUMB
  if (options.includeRules) {
    // Find matching cheat sheets
    const matchingCheats = CHEAT_SHEETS.filter(
      (c) =>
        c.subjectId === topic.subjectId ||
        c.category.toLowerCase().includes(topic.category.toLowerCase()) ||
        topic.title.toLowerCase().includes(c.category.toLowerCase())
    );

    if (matchingCheats.length > 0) {
      drawSectionHeader('4. Diagnostic Decision Rules & Expert Rules of Thumb', 'Exam & Production Tips');

      matchingCheats.forEach((cheat) => {
        const descLines = doc.splitTextToSize(cheat.description, contentWidth - 8);
        const ruleLines = cheat.ruleOfThumb
          ? doc.splitTextToSize(cheat.ruleOfThumb, contentWidth - 14)
          : [];
        const boxHeight = 9 + descLines.length * 3.8 + (ruleLines.length > 0 ? ruleLines.length * 3.8 + 8 : 0);

        checkAddPage(boxHeight);

        doc.setFillColor(254, 252, 232); // amber-50
        doc.setDrawColor(254, 240, 138); // amber-200
        doc.roundedRect(margin, currentY, contentWidth, boxHeight - 2, 1.5, 1.5, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(146, 64, 14); // amber-800
        doc.text(`⚡ Rule: ${cheat.title} (${cheat.category})`, margin + 3, currentY + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(51, 65, 85);
        doc.text(descLines, margin + 4, currentY + 9.5);

        if (cheat.ruleOfThumb) {
          const ruleY = currentY + 9.5 + descLines.length * 3.8 + 1;
          doc.setFillColor(254, 243, 199);
          doc.roundedRect(margin + 3, ruleY, contentWidth - 6, ruleLines.length * 3.8 + 4, 1, 1, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(180, 83, 9);
          doc.text('KEY TAKEAWAY:', margin + 5, ruleY + 3.8);
          doc.setFont('helvetica', 'normal');
          doc.text(ruleLines, margin + 28, ruleY + 3.8);
        }

        currentY += boxHeight + 2;
      });
    }
  }

  // 6. ALGORITHMIC FLOWCHART & WORKFLOW
  if (options.includeFlowchart && topic.flowchart && topic.flowchart.steps.length > 0) {
    drawSectionHeader('5. Algorithmic Workflow & Execution Stages', topic.flowchart.title);

    topic.flowchart.steps.forEach((step, sIdx) => {
      const descLines = doc.splitTextToSize(step.description, contentWidth - 28);
      const detailLines = step.details ? doc.splitTextToSize(step.details, contentWidth - 28) : [];
      const boxHeight = 8 + descLines.length * 3.6 + (detailLines.length > 0 ? detailLines.length * 3.6 + 2 : 0);

      checkAddPage(boxHeight);

      // Node box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, boxHeight - 2, 1, 1, 'FD');

      // Step indicator circle
      doc.setFillColor(79, 70, 229);
      doc.circle(margin + 4.5, currentY + 4, 2.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(`${sIdx + 1}`, margin + 3.5, currentY + 4.8);

      // Step Title & Category
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(step.title, margin + 9, currentY + 4.8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(99, 102, 241);
      doc.text(`[${step.category.toUpperCase()}]`, margin + 65, currentY + 4.8);

      // Step Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(descLines, margin + 9, currentY + 8.5);

      if (step.details) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.2);
        doc.setTextColor(100, 116, 139);
        doc.text(detailLines, margin + 9, currentY + 8.5 + descLines.length * 3.6);
      }

      currentY += boxHeight + 1.5;
    });
  }

  // 7. PYTHON IMPLEMENTATION RECIPE
  if (options.includeCode && topic.pythonSnippet && topic.pythonSnippet.code) {
    drawSectionHeader('6. Defensive Python Implementation Recipe', topic.pythonSnippet.title);

    const rawCodeLines = topic.pythonSnippet.code.trim().split('\n');
    const codeLineHeight = 3.6;
    const codeBoxHeight = rawCodeLines.length * codeLineHeight + 8;

    checkAddPage(Math.min(codeBoxHeight, 60)); // ensure room for heading & top of code

    // Code container
    doc.setFillColor(15, 23, 42); // slate-900 dark code background
    doc.roundedRect(margin, currentY, contentWidth, codeBoxHeight, 1.5, 1.5, 'F');

    doc.setFont('courier', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(147, 197, 253); // blue-300

    let codeY = currentY + 5.5;
    rawCodeLines.forEach((line) => {
      if (codeY > pageHeight - 16) {
        doc.addPage();
        drawRunningHeader();
        currentY = margin + 8;
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(margin, currentY, contentWidth, 30, 1.5, 1.5, 'F');
        codeY = currentY + 5.5;
      }
      doc.text(line.substring(0, 85), margin + 4, codeY);
      codeY += codeLineHeight;
    });

    currentY = codeY + 4;

    // Code explanation
    if (topic.pythonSnippet.explanation) {
      const expLines = doc.splitTextToSize(topic.pythonSnippet.explanation, contentWidth - 8);
      checkAddPage(expLines.length * 3.8 + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(expLines, margin + 2, currentY + 3);
      currentY += expLines.length * 3.8 + 6;
    }
  }

  // 8. REAL-WORLD INDUSTRY CASE STUDY
  if (options.includeCaseStudy && topic.caseStudy) {
    drawSectionHeader('7. Production Case Study & Real-World Application', topic.caseStudy.industry);

    const cs = topic.caseStudy;
    const probLines = doc.splitTextToSize(`Problem: ${cs.problem}`, contentWidth - 8);
    const outLines = doc.splitTextToSize(`Outcome: ${cs.outcome}`, contentWidth - 8);
    const takeLines = doc.splitTextToSize(`Key Takeaway: ${cs.keyTakeaway}`, contentWidth - 8);
    const csHeight = 12 + (probLines.length + outLines.length + takeLines.length) * 3.8;

    checkAddPage(csHeight);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, contentWidth, csHeight - 2, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${cs.title} (${cs.companyExample})`, margin + 3, currentY + 5);

    let csY = currentY + 9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(probLines, margin + 4, csY);
    csY += probLines.length * 3.8;

    doc.text(outLines, margin + 4, csY);
    csY += outLines.length * 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(takeLines, margin + 4, csY);

    currentY += csHeight + 2;
  }

  // 9. SELF-ASSESSMENT QUIZ & REVIEW QUESTIONS (WITH ANSWER KEY)
  if (options.includeQuiz && topic.quiz && topic.quiz.length > 0) {
    drawSectionHeader('8. Self-Assessment Practice Questions & Answer Key', 'Exam Retention Test');

    topic.quiz.forEach((q, qIdx) => {
      const qLines = doc.splitTextToSize(`Q${qIdx + 1}: ${q.question}`, contentWidth - 8);
      const optLines = q.options.map((opt, oIdx) => `  ${String.fromCharCode(65 + oIdx)}) ${opt}`);
      const expLines = doc.splitTextToSize(`Answer: Option ${String.fromCharCode(65 + q.correctIndex)} — ${q.explanation}`, contentWidth - 10);
      const qHeight = 8 + (qLines.length + optLines.length) * 3.6 + expLines.length * 3.6 + 4;

      checkAddPage(qHeight);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, qHeight - 2, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(qLines, margin + 3, currentY + 4.5);

      let subQY = currentY + 4.5 + qLines.length * 3.6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(71, 85, 105);
      optLines.forEach((ol) => {
        doc.text(ol, margin + 3, subQY);
        subQY += 3.6;
      });

      // Explanation box
      doc.setFillColor(240, 253, 244); // green-50
      doc.setDrawColor(187, 247, 208);
      doc.roundedRect(margin + 2, subQY, contentWidth - 4, expLines.length * 3.6 + 2, 1, 1, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(22, 101, 52); // green-800
      doc.text(expLines, margin + 4, subQY + 3.2);

      currentY += qHeight + 2;
    });
  }

  // 10. RUNNING FOOTERS & TOTAL PAGE NUMBERS
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `M.Tech Data Analytics Curriculum  •  ${topic.title}  •  Confidential Academic Revision Sheet`,
      margin,
      pageHeight - 7
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      { align: 'right' }
    );
  }

  // 11. SAVE & TRIGGER DOWNLOAD
  const sanitizedTitle = topic.title
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 32);
  doc.save(`${topic.id}_${sanitizedTitle}_CheatSheet.pdf`);
}
