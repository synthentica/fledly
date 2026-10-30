---
name: fledly
description: Use for iOS App Store market questions - which new apps already earn money, what app to build next, top charts, one app's details, or where an app ranks for a search and which keywords to target. Answers come from the Fledly MCP tools (fledly_*).
---

# Using Fledly

Fledly answers questions about the iOS App Store from data it collects every day. Its tools appear with the prefix `fledly_` (for example `fledly_get_app`).
The first call opens a browser to sign in to Fledly; if a tool says it needs authorization, ask the user to run `opencode mcp auth fledly`.

- "What new apps make money?" → `find_young_earners` (filter by `genre`, `max_age_months`, `min_monthly_revenue_usd`).
- "What app should I build?" → `list_app_ideas` with `source: "proven"`, then `get_app_idea` for the evidence behind one idea.
- "What's on top of the charts?" → `get_top_charts`.
- Questions about one app → `get_app` (accepts an App Store id, link or name).
- "Where does my app rank for X?" → `search_app_store` with `app_id`; for daily tracking use `track_app`, then `track_keywords`, and read results later with `get_my_apps`.
- Keyword ideas for an app → `suggest_keywords`.

When the user is working on an iOS project, the app's App Store id is often in the project (for example in fastlane metadata or App Store Connect links); use it with `get_app`, `search_app_store` and `get_my_apps`.

When quoting revenue, say that the figures are Fledly estimates from chart positions. Market lists cover us, gb, de, ca, au and fi; live lookups and searches work in any App Store country.

If a result says the free plan limited it, tell the user how many results they saw and that the full list is on paid plans at https://fledly.app/pricing. Do not push upgrades beyond that.
