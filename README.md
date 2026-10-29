# Strategy Teardowns

Short, sourced strategy memos, each with a live model the reader can change.

**Teardown 1: quick-commerce dark-store unit economics.** A one-page memo built from Swiggy's and Eternal's Q2 FY27 disclosures, plus a calculator with sliders for orders per store per day, order value, variable margin, store fixed cost and capex. Outputs are profit per day and month, break-even orders and capex payback.

## How the model works

Store profit per day = orders x order value x variable margin - store fixed cost.

Neither company discloses variable margin or store fixed cost. The model therefore calibrates: for any variable margin you assume, fixed cost is set so the model reproduces the company's reported contribution margin at its reported (or derived) orders per store per day. Moving a slider then shows operating leverage from a reported starting point. All assumptions are labelled in the interface.

## Data and sources

Every figure is cited to one of five sources listed on the Sources page. Instamart figures come from Swiggy's own shareholder letter. Blinkit figures come from press reports of Eternal's results, because Eternal's own letter could not be opened. Blinkit orders per store per day (1,670) is derived from reported orders and store counts, and cross-checks against reported net order value to within Rs 0.1 per order.

## Checks

`npm test` runs six tests: the calibration reproduces each reported margin, break-even matches the closed form, payback is correct, and the Blinkit derivation matches the sources. There is no AI feature in this project, so there is no model evaluation.

## Limits

One quarter, company-wide averages. Contribution margin and order value are defined differently across the two companies. Not investment advice.

## Run locally

```
npm install
npm run dev
```

No environment variables are needed.

Copyright (c) 2026 Divyansh Srivastava. All rights reserved. See LICENSE.

Read the one-page [case study](CASE_STUDY.md).
