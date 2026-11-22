---
name: fledly-competitor-watch
description: Track and compare an iOS app's App Store competitors with Fledly's MCP tools - what they changed in their listings, where they outrank the user, which words they use that the user does not, and who is new in the top 10. Use when the user asks what competitors changed, who their competitors are, why a competitor ranks higher, or wants to set up or review competitor tracking.
---

# Competitor watch with Fledly

Sets up competitor tracking for one of the user's apps and reads it back as a short report. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **The user's app.** Call `get_my_apps`. Competitor tracking works only for tracked apps; if the app is missing, offer `track_app` (ask first).
2. **Who to watch.** If the user names competitors, resolve each with `get_app` (name, id or link). If not, call `get_competitor_report` once and read `suggested_competitors`: apps that are often in the user's top 10. Good competitors share the user's searches, not just the category.
3. **Add them.** With the user's OK, `track_competitor` with `app_id` (the user's app) and `competitor_id`. `get_account` shows how many competitors the plan allows. `untrack_competitor` removes one; its history stays.
4. **Read the report.** Call `get_competitor_report` with `app_id`, `country` and `days` (7 for a weekly look, up to 90). Use:
   - `competitors[].changes`: name, subtitle, icon, screenshots, price, version and description changes by day.
   - `competitors[].ratings_gained`: momentum.
   - `searches`: positions on the user's tracked searches; `gap: true` means a competitor is in the top 10 and the user is not.
   - `word_gaps`: words in competitors' names and subtitles that the user's listing lacks.
   - `top10_changes`: apps that entered, left or moved in the top 10.
   - `my_changes`: the user's own listing changes in the same window, to line up cause and effect.

## Output

```
Competitors of <App> in <store>, last <n> days

Changes
- <Competitor>: <field> "<old>" -> "<new>" (<day>)

Where they beat you
- "<search>": <Competitor> #<n>, you #<n | not in top 50>

Words they use, you don't
- <word> (used by <apps>)

Top 10 movement
- "<search>": <app> entered at #<n>

What to do
- <1-3 concrete actions tied to the findings above>
```

## Rules

- Listings and positions are checked once a day, from the top 50 results. Say "not in the top 50", not "unranked".
- A competitor's change and a rank move on the same day are a correlation, not proof.
- Do not suggest copying a competitor's brand name or trademark into the user's metadata.
- Revenue figures in `get_app` are estimates; label them.
