# Strategy Teardowns: case study

**Problem.** Strategy takes on quick commerce are usually opinions. A reader cannot change an assumption and see what happens.

**What I built.** Teardown 1: dark-store unit economics for Blinkit and Instamart from Swiggy's and Eternal's Q2 FY27 disclosures. A one-page memo plus a calculator with sliders for orders per store per day, order value, variable margin, store fixed cost and capex. Outputs: profit per day and month, break-even orders and capex payback.

**Method.** Store profit per day = orders x order value x variable margin - store fixed cost. Neither company discloses variable margin or fixed cost, so the model calibrates: for any margin you assume, fixed cost is set so the model reproduces the reported contribution margin at the reported or derived orders per store. Sliders then show operating leverage from a reported starting point. All assumptions are labelled.

**Sources.** Five, listed on the Sources page. Instamart figures come from Swiggy's own shareholder letter. Blinkit figures come from press reports of Eternal's results, because Eternal's own letter could not be opened. Blinkit's 1,670 orders per store per day is derived from reported orders and store counts and cross-checks against net order value to within Rs 0.1 per order.

**Evidence.** Six tests: calibration reproduces each reported margin, break-even matches the closed form, payback is correct, and the Blinkit derivation matches the sources. No AI feature, so no model evaluation.

**Limits.** One quarter, company-wide averages, margin and order value defined differently by the two companies. Not investment advice.

**Next.** Teardown 2, and Blinkit figures from Eternal's own letter once available.

Live: https://strategy-teardowns.vercel.app
