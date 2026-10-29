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
