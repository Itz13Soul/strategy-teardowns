export type Source = { id: string; label: string; url: string; kind: "primary" | "secondary" };

export const SOURCES: Source[] = [
  {
    id: "S1",
    label: "Swiggy, Q2 FY2027 shareholder letter (pp. 4, 7, 13)",
    url: "https://www.swiggy.com/corporate/wp-content/uploads/2026/10/Q2-FY2027-Shareholder-letter.pdf",
    kind: "primary",
  },
  {
    id: "S2",
    label: "MediaNama, Eternal Q2 FY27 results",
    url: "https://www.medianama.com/2026/10/223-eternal-125-crore-profit-q2fy27/",
    kind: "secondary",
  },
  {
    id: "S3",
    label: "Indian Startup News, Eternal Q2 FY27 results (22 Oct 2026)",
    url: "https://indianstartupnews.com/news/eternal-q2-profit-jumps-92-to-rs-125-crore-as-blinkit-earns-rs-184-crore-and-targets-3500-stores-12696316",
    kind: "secondary",
  },
  {
    id: "S4",
    label: "Business Standard, Eternal Q2 FY27 and Blinkit expansion",
    url: "https://www.business-standard.com/markets/news/eternal-eyes-faster-blinkit-expansion-as-margins-and-order-values-grow-126102201467_1.html",
    kind: "secondary",
  },
  {
    id: "S5",
    label: "MediaNama, Eternal Q2 FY27 earnings call takeaways",
    url: "https://www.medianama.com/2026/10/223-eternal-q2-fy27-results-ai-strategy/",
    kind: "secondary",
  },
];

SOURCES.push(
  {
    id: "S6",
    label: "V-Mart Retail, Q1 FY2027 investor presentation, filed with NSE 24 July 2026 (slides 4, 5, 7, 14, 17, 19, 20)",
    url: "https://nsearchives.nseindia.com/corporate/VMART_24072026191417_FinalPresentation.pdf",
    kind: "primary",
  },
  {
    id: "S7",
    label: "Sahi, V-Mart Retail Q2 FY27 business update",
    url: "https://www.sahi.com/news/v-mart-retail-q2-fy27-revenue-up-18-to-953-crore-total-stores-at-613",
    kind: "secondary",
  },
  {
    id: "S8",
    label: "Vishal Mega Mart, investor presentation May 2026, filed with NSE (slides 4, 5, 10)",
    url: "https://nsearchives.nseindia.com/corporate/VMMP2024_14052026134121_Signed_Disclosure_Investor_Presentation_VMM_May_2026.pdf",
    kind: "primary",
  },
  {
    id: "S9",
    label: "Investywise, Vishal Mega Mart Q2 FY27 earnings presentation summary",
    url: "https://www.investywise.com/vishal-mega-mart-limited-earnings-presentation-for-q2fy27-and-h1fy27",
    kind: "secondary",
  },
);
