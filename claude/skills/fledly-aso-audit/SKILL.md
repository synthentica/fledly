---
name: fledly-aso-audit
description: Scored App Store Optimization audit of one iOS app's listing with Fledly's MCP tools, ending in a prioritized fix list with ready-to-paste text. Use when the user asks to audit, review, grade or score their App Store listing, asks why their app does not get found, or wants to know what to fix first in their title, subtitle, keyword field, screenshots or ratings.
---

# ASO audit with Fledly

Produces one scored review of an app's App Store listing and the fixes in order of impact. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill. Tool names may carry a client prefix (`fledly_get_app`, `mcp__fledly__get_app`).

## Steps

1. **Find the app.** Call `get_my_apps`. If the app is tracked, use its `app_id` and main store. If not, get the App Store id or link from the user or the project (fastlane metadata, App Store Connect links) and call `get_app` with it and the store the user cares about. A `queued` status means Fledly collects it overnight: say so and stop instead of retrying.
2. **Track it if the user agrees.** `get_app_tips` and the rank data only work for tracked apps. Ask before calling `track_app` (it changes the user's account and counts against their plan; `get_account` shows the limits).
3. **Get the scored tips.** Call `get_app_tips` with `app_id` and `country`. It returns an ASO score out of 100, a prioritized tip list with the reason in numbers, and text that already fits Apple's limits.
4. **Check the texts the user has now.** Call `check_metadata` with the current title, subtitle and, if the user shares it, the keyword field and `locale`. Apple does not publish keyword fields, so ask for it rather than guessing.
5. **Look at the competition.** If the app has competitors tracked, call `get_competitor_report` for the same store and pick out `word_gaps` and `searches` where `gap` is true. If none are tracked, mention `suggested_competitors` from the report or offer `track_competitor`.
6. **Where it ranks.** For the two or three searches that matter most, `get_my_apps` (tracked) or `search_app_store` with `app_id` gives the position.

## Output

```
ASO audit: <App name> (<store>), <date>
Score: <n>/100 (Fledly's ASO score)

What works
- <2-4 short points backed by data>

Fix first (highest impact)
1. <tip title>: <why, with the number from the tip>
   Paste: <field> = "<text>" (<n>/<limit> chars)
2. ...

Also worth doing
- <lower-impact tips, one line each>

Checks
- check_metadata: <errors and warnings, or "passes">
```

Keep the fix list to the tips Fledly returned plus check_metadata findings. Quote the exact ready-to-paste text from the tip's `fields`; do not rewrite it into something longer than its limit.

## Rules

- Revenue, download and popularity figures are Fledly estimates from public signals. Label them as estimates.
- Do not invent search volumes or ranks. If Fledly has no data for a search, say it was queued and will be there tomorrow.
- After the user makes a change, offer `mark_tip_done` with the tip id so Fledly can check on day 7 whether the change helped.
- If the free plan cut a list short, say how many items were shown and that the full list is on paid plans at https://fledly.app/pricing. Nothing more salesy than that.
