---
name: fledly-market-pulse
description: Quick read of the iOS App Store market with Fledly's MCP tools - today's top grossing, free and paid charts, young apps that started earning recently, fast risers and the categories they are in. Use when the user asks what is trending on the App Store, what is on the top charts, which new apps are taking off, which categories are hot right now, or wants a market overview for one country.
---

# Market pulse with Fledly

A short, data-backed snapshot of what moves on the App Store in one country. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Store and focus.** Use the country the user names; else the first store in their profile (`get_my_apps`), else `us`. Market lists cover us, gb, de, ca, au, fi, jp, kr, fr, es, it, br, mx, nl, se, ch, tw, hk, th, vn, in, sa and ae.
2. **Charts.** `get_top_charts` with `chart: "grossing"` (and `free` or `paid` if asked) and `country`. Compare each rank with its rank a week ago: new entries and big jumps are the news.
3. **Young earners.** `find_young_earners` with `sort: "newest"` and `max_age_months: 6` for the newest apps that already earn, and `sort: "growth"` for the fastest rating growth. Read `by_genre` and `total_matches` to see which categories hold the most young earners.
4. **Category drill-down.** If one category stands out or the user has one, repeat `find_young_earners` with that `genre` and look at `business_model`, `prices` and `top_complaints`.
5. **Ideas.** `list_app_ideas` with `source: "proven"` and `verdict: "build"` (filter by `genre` if useful) for the ideas the data supports right now.

## Output

```
App Store pulse, <store>, <date>

Charts
- Top grossing: <notable movers and new entries>

New money (released in the last 6 months)
- <App> (<genre>): ~<range> per month estimated, <age> months, <price model>

Hot categories: <genre (n young earners)>, ...
Fast risers: <App> +<ratings_per_month> ratings a month

Worth a look: <1-3 ideas with a one-line why>
```

## Rules

- Revenue figures are Fledly estimates from chart positions; always say "estimated" and give the range.
- Skip or flag apps with `estimate_confidence: "low"`, `paid_traffic_suspected`, `lookalike_name` or `reissued_listing`: they distort the picture.
- Big publishers are excluded from young earners; the charts include them.
- Lists refresh once a day. A trend from one day of data is a hint, not a trend.
