---
name: fledly-my-numbers
description: Read an iOS developer's own App Store Connect downloads, proceeds and RevenueCat MRR with Fledly's MCP tools and tie them to listing changes and finished ASO tips. Use when the user asks how many downloads or how much revenue their own app made, whether a metadata change or tip moved downloads, how this week compares with last week, or which storefronts bring their downloads.
---

# Your numbers with Fledly

The user's real numbers, not estimates: daily first-time downloads, redownloads, in-app purchase units and developer proceeds from their App Store Connect Sales and Trends report, plus RevenueCat MRR, active subscriptions and trials. Needs Fledly's MCP server (`https://fledly.app/mcp`) and a Pro or Studio plan with App Store Connect connected on fledly.app (Plan and billing, Connections). If the tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Which app.** `get_my_apps` lists the tracked apps. Use the App Store id or name the user means.
2. **The numbers.** `get_my_numbers` with `app` and `days` (28 by default, up to 365). It returns `last_7_days` and `last_28_days` against the period before, `daily`, `top_storefronts_28_days`, `revenuecat.latest` and `markers` (days the listing changed or a tip was marked done).
   - `locked: true`: the plan has no access. Say it is on Pro and Studio, once, with https://fledly.app/pricing.
   - Nothing connected: tell the user where to connect (Plan and billing, Connections on fledly.app) and that Fledly then loads the last 90 days.
3. **Cause and effect.** For each marker, compare the 7 days before with the 7 days after. `get_app_tips` gives the same comparison per change in `did_it_help` (downloads next to the rank moves), and `get_competitor_report` shows whether a competitor changed its listing in the same days.
4. **Weekly view.** `get_weekly_brief` includes `your_numbers` (last 7 days vs the 7 before) for a Monday check-in.

## Output

```
<App>, through <day> (Apple's report)
Last 7 days: <downloads> downloads (<+/-%>), <proceeds> proceeds (<+/-%>)
Last 28 days: <downloads> downloads, <proceeds> proceeds
MRR: <mrr> · <active subscriptions> active · <trials> in trial (RevenueCat, <day>)
Top storefronts: <store> <downloads>, …

What changed around it
- <day>: <listing change or tip>: downloads 7 days before <n>, after <n> (<+/-%>)
```

## Rules

- These are the user's own reported numbers: quote them as numbers, not estimates. Fledly's market revenue figures (other apps) remain estimates.
- Apple reports a day the next morning Pacific time, so yesterday is often missing. Say "through <day>".
- Downloads are first-time downloads; redownloads are separate and updates are never counted.
- Proceeds are what Apple pays the developer, converted to USD at the day's reference rate.
- A change and a move in downloads in the same week are a correlation, not proof: seasonality, featuring and ads move downloads too.
- The numbers are private to the user. Don't paste them anywhere public unless the user asks.
