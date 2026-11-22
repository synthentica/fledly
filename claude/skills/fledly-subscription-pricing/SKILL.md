---
name: fledly-subscription-pricing
description: Subscription and in-app purchase pricing research for an iOS app with Fledly's MCP tools - what competitors and young apps that earn in the niche charge (weekly, monthly, yearly, lifetime), which business model earns, and what reviews say about price. Use when the user asks how much to charge, what subscription price or trial to use, whether to go yearly, monthly or lifetime, or what competitors charge for their app.
---

# Subscription pricing with Fledly

Collects the price points that already work in the user's niche and turns them into a pricing proposal. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **The niche.** `get_my_apps` for the profile (category, stores). Ask for the user's current or planned price if there is one.
2. **Earners and their prices.** `find_young_earners` with the `genre` and/or `query` and the main `country`. Each app has `business_model` (subscription, in-app purchases, unknown), `prices` (up to four price points with period: `/wk`, `/mo`, `/3mo`, `/6mo`, `/yr`, or one-time) and `revenue_month_usd_estimate` with `revenue_range_usd`.
3. **Direct competitors.** `get_app` for each named competitor (or the user's tracked competitors from `get_competitor_report`). Read the price and in-app purchase list. `get_competitor_report` also shows recent `price` changes.
4. **The idea view.** If the niche is a scored idea, `get_app_idea` lists the proving apps with prices and complaints.
5. **What users say about price.** `top_complaints` in the earners list and review complaint alerts in `get_app` show whether "paywall" or "price" is a top complaint in the niche. A niche where everyone complains about a weekly paywall is an opening for a fair yearly or lifetime plan.

## Output

```
Pricing in <niche>, <store>

| App | Model | Prices | Est. revenue / month |
| --- | --- | --- | --- |
| <App> | subscription | $4.99/mo, $29.99/yr | $20k-40k (estimate) |

Pattern: <e.g. most earners sell yearly at $25-40 with a 7-day trial; weekly plans only in apps with paid installs>
Price complaints: <yes/no, how common>

Proposal
- Main plan: <price and period>, why
- Second plan: <...>
- Trial: <length> or none, why
- Test: <one change to try first and how to read the result>
```

## Rules

- Revenue figures are Fledly estimates from chart positions; always label them and give the range.
- Prices are what the store shows in that country now; they differ by storefront and change over time.
- Do not tell the user what they will earn. Show what others charge and what earns, then let them decide.
- Weekly subscriptions and dark-pattern paywalls draw complaints and App Review attention; mention it when the data shows them.
