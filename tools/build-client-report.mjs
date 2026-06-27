import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
const screenshotDir = path.join(reportsDir, "screenshots");
const outputPath = path.join(reportsDir, "natureslove-uiux-client-report.docx");
const logoPath = path.join(root, "public", "img", "natureslovelogo.png");

fs.mkdirSync(reportsDir, { recursive: true });

const COLORS = {
  forest: "123A2A",
  leaf: "5D7D5B",
  cream: "F9F2E3",
  pale: "EEF6D7",
  line: "D7DFC8",
  ink: "1D3026",
  muted: "50675A",
  blue: "2E74B5",
  tableHeader: "F2F4F7",
};

const screenshots = [
  {
    title: "Homepage animated product hero",
    file: "01-home-hero.png",
    caption:
      "A cinematic hero introduces Nature's Love with rotating product pouches, color-adaptive backgrounds, clean navigation, and product category icons.",
  },
  {
    title: "About section product story",
    file: "02-about-section.png",
    caption:
      "The About section uses large product visuals and a calm natural palette to move from product excitement into brand story and service promises.",
  },
  {
    title: "Blog, product education, and trust panel",
    file: "03-blog-trust.png",
    caption:
      "The blog area explains product benefits, how to eat them, and includes a trust metric designed to count up on section entry.",
  },
  {
    title: "Contact and footer structure",
    file: "04-contact-footer.png",
    caption:
      "The lower page groups contact, email, opening hours, navigation, and brand reassurance in a more structured, premium footer.",
  },
];

function imageBuffer(filePath) {
  return fs.readFileSync(filePath);
}

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: "Calibri",
    color: opts.color || COLORS.ink,
    bold: opts.bold || false,
    italics: opts.italics || false,
    size: opts.size || 22,
    break: opts.break || 0,
  });
}

function para(children, opts = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [run(children)],
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: {
      before: opts.before ?? 0,
      after: opts.after ?? 120,
      line: opts.line ?? 264,
    },
    heading: opts.heading,
    bullet: opts.bullet,
    keepNext: opts.keepNext,
    pageBreakBefore: opts.pageBreakBefore,
  });
}

function h1(text) {
  return para([run(text, { bold: true, size: 32, color: COLORS.blue })], {
    heading: HeadingLevel.HEADING_1,
    before: 320,
    after: 160,
    keepNext: true,
  });
}

function h2(text) {
  return para([run(text, { bold: true, size: 26, color: COLORS.blue })], {
    heading: HeadingLevel.HEADING_2,
    before: 240,
    after: 120,
    keepNext: true,
  });
}

function bullet(text) {
  return para(text, {
    bullet: { level: 0 },
    after: 110,
    line: 280,
  });
}

function caption(text) {
  return para([run(text, { italics: true, size: 19, color: COLORS.muted })], {
    after: 170,
    line: 240,
  });
}

function callout(title, body) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: COLORS.line },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: COLORS.line },
      left: { style: BorderStyle.SINGLE, size: 8, color: COLORS.line },
      right: { style: BorderStyle.SINGLE, size: 8, color: COLORS.line },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 9360, type: WidthType.DXA },
            margins: { top: 220, bottom: 220, left: 260, right: 260 },
            shading: { type: ShadingType.CLEAR, fill: COLORS.pale },
            children: [
              para([run(title, { bold: true, size: 22, color: COLORS.forest })], {
                after: 70,
              }),
              para([run(body, { size: 21, color: COLORS.ink })], { after: 0, line: 276 }),
            ],
          }),
        ],
      }),
    ],
  });
}

function simpleTable(headers, rows) {
  const widths = [1900, 2600, 4860];
  const makeCell = (text, width, isHeader = false) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      margins: { top: 130, bottom: 130, left: 150, right: 150 },
      shading: isHeader ? { type: ShadingType.CLEAR, fill: COLORS.tableHeader } : undefined,
      children: [
        para([run(text, { bold: isHeader, size: 20, color: isHeader ? COLORS.ink : COLORS.muted })], {
          after: 0,
          line: 250,
        }),
      ],
    });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.line },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((header, index) => makeCell(header, widths[index], true)),
      }),
      ...rows.map(
        (row) =>
          new TableRow({
            children: row.map((cell, index) => makeCell(cell, widths[index])),
          }),
      ),
    ],
  });
}

const children = [];

children.push(
  para([run("Nature's Love", { bold: true, size: 48, color: COLORS.forest })], {
    alignment: AlignmentType.CENTER,
    after: 60,
  }),
  para([run("Website UI/UX Improvement Report", { bold: true, size: 34, color: COLORS.ink })], {
    alignment: AlignmentType.CENTER,
    after: 120,
  }),
);

if (fs.existsSync(logoPath)) {
  children.push(
    para(
      [
        new ImageRun({
          data: imageBuffer(logoPath),
          transformation: { width: 150, height: 68 },
          type: "png",
        }),
      ],
      { alignment: AlignmentType.CENTER, after: 180 },
    ),
  );
}

children.push(
  callout(
    "Prepared for client presentation",
    "This report summarizes the current homepage, About, Blog, trust, and footer improvements, then outlines practical recommendations to strengthen product credibility and the overall user experience.",
  ),
  para([run("Prepared date: 27 June 2026", { size: 20, color: COLORS.muted })], {
    alignment: AlignmentType.CENTER,
    before: 180,
    after: 80,
  }),
  para([run("Prototype note: product pouch visuals are AI-generated placeholders until final photography is supplied.", { size: 20, color: COLORS.muted, italics: true })], {
    alignment: AlignmentType.CENTER,
    after: 180,
  }),
  new Paragraph({ children: [new PageBreak()] }),
);

children.push(
  h1("Executive Summary"),
  para(
    "The refreshed Nature's Love website now presents the brand as more premium, natural, and product-led. The homepage opens with a full-screen animated carousel, smooth color transitions, cleaner navigation, stronger mobile behavior, and a clearer visual story around the main product categories.",
  ),
  para(
    "The About, Blog, trust, and footer areas were also shaped into a more usable customer journey: users can understand the brand, see product benefits, learn how to consume the products, read customer-oriented content, and contact the company with less friction.",
  ),
  h2("Main UI/UX Improvements"),
  bullet("Animated product hero with rotating pouch visuals, background color changes, circular motion, and readable product details."),
  bullet("Cleaner navigation with a glass-style mobile menu, simplified desktop buttons, search icon treatment, and a stronger Shop Now call-to-action."),
  bullet("Responsive mobile refinements so the carousel, labels, menu, and category buttons fit comfortably on smaller screens."),
  bullet("About section redesigned with brand storytelling, product visuals, scroll-triggered motion, service cards, and mission/vision/value cards."),
  bullet("Blog section added with product benefits, usage ideas such as cereal, yogurt, smoothie bowls, salads, and snack mixes, plus a trusted-customer counter."),
  bullet("Contact and footer areas reorganized for clearer contact details, navigation, and brand reassurance."),
  h2("Screenshot Highlights"),
);

screenshots.forEach((shot, index) => {
  children.push(
    para([run(`${index + 1}. ${shot.title}`, { bold: true, size: 24, color: COLORS.forest })], {
      keepNext: true,
      before: index === 0 ? 80 : 220,
      after: 80,
    }),
    para(
      [
        new ImageRun({
          data: imageBuffer(path.join(screenshotDir, shot.file)),
          transformation: { width: 580, height: 363 },
          type: "png",
        }),
      ],
      { alignment: AlignmentType.CENTER, after: 70 },
    ),
    caption(shot.caption),
  );
});

children.push(
  h1("Suggestions to Improve User Experience and Trust"),
  callout(
    "Highest-priority trust recommendation",
    "Replace all AI-generated product pouch images with real, high-resolution product photography before launch. AI-generated product images are useful for prototyping, but today many customers can recognize synthetic packaging. For a food brand, real product photos are essential for confidence, appetite appeal, and purchase trust.",
  ),
  h2("Trust and Content Recommendations"),
  bullet("Use real product photography: show front pack, back pack, ingredient close-ups, serving examples, and lifestyle shots with real bowls, cereal, yogurt, salads, or snack trays."),
  bullet("Audit customer reviews: based on the concern that fake reviews exist on the current live website, remove unverifiable reviews because they can damage brand credibility quickly."),
  bullet("Use verified reviews only: collect reviews from real buyers, show customer initials or names with permission, add dates, and avoid over-polished review language."),
  bullet("Show certification proof: include GMP, HACCP, and ISO 22000 badges with a short explanation of what each certification means for safety and quality."),
  bullet("Strengthen product pages: add ingredients, nutrition facts, pack sizes, storage guidance, allergen notes, and clear 'how to eat' ideas for each product."),
  bullet("Make the Shop Now flow direct: link homepage product/category actions to the correct Nuts, Seeds, Dried Fruits, Confectionery, and Natural Fiber shop categories."),
  bullet("Keep animations premium: preserve smooth motion, but limit speed and visual clutter so the product remains the main focus."),
  h2("Experience and Conversion Recommendations"),
  simpleTable(
    ["Priority", "Recommendation", "Expected Value"],
    [
      ["High", "Replace placeholders with real product images", "Improves product trust, brand authenticity, and purchase confidence."],
      ["High", "Review cleanup and verified review process", "Protects brand reputation and makes social proof believable."],
      ["Medium", "Add product category landing pages", "Helps users browse by Nuts, Seeds, Dried Fruits, Confectionery, and Natural Fiber."],
      ["Medium", "Add nutrition and serving guidance", "Answers buyer questions and supports healthier daily-use positioning."],
      ["Medium", "Performance and accessibility QA", "Keeps the rich animation experience smooth on mobile and usable for all visitors."],
    ],
  ),
  h1("Recommended Next Steps"),
  para("1. Replace the prototype product images with real Nature's Love photography and re-check the carousel layout on desktop and mobile."),
  para("2. Review the current website's customer testimonials and remove anything that cannot be verified."),
  para("3. Connect the Shop Now and category buttons to live product/category pages."),
  para("4. Add final product copy, ingredients, certification proof, and nutrition details."),
  para("5. Run final quality checks: mobile responsiveness, performance, accessibility contrast, SEO metadata, and checkout path testing."),
  h1("Closing Note"),
  para(
    "The current prototype gives Nature's Love a more memorable, modern, and product-focused first impression. The most important launch step is now authenticity: real photography, verified reviews, accurate product information, and direct shopping links will turn the polished UI into a trustworthy customer experience.",
  ),
);

const doc = new Document({
  creator: "Codex",
  title: "Nature's Love Website UI/UX Improvement Report",
  description: "Client report covering completed UI/UX improvements and recommendations.",
  styles: {
    paragraphStyles: [
      {
        id: "Normal",
        name: "Normal",
        run: { font: "Calibri", size: 22, color: COLORS.ink },
        paragraph: { spacing: { after: 120, line: 264 } },
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Calibri", size: 32, bold: true, color: COLORS.blue },
        paragraph: { spacing: { before: 320, after: 160 } },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Calibri", size: 26, bold: true, color: COLORS.blue },
        paragraph: { spacing: { before: 240, after: 120 } },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      footers: {},
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log(outputPath);
