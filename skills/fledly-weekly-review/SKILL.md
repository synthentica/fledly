---
name: fledly-weekly-review
description: Weekly App Store check-in with Fledly's MCP tools - which tracked searches moved, what competitors changed, the top open listing tip per app, new young earners and ideas in the user's categories - then the user picks what to do and finished tips are marked done. Use for a Monday or weekly review, when the user asks what happened this week with their apps, how their rankings changed, or what to work on next for ASO.
---

# Weekly review with Fledly

One short weekly check-in that ends in a to-do list. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **The brief.** Call `get_weekly_brief` (optionally `country` and `max_apps`). It returns the saved profile, tracked searches that moved most in 7 days (top-10 entries and exits first), per app the competitors' listing changes, top-10 newcomers and the top open tip, and young earners and ideas in the user's categories. Sections in `unavailable` had no data or failed; mention them in one line.
2. **No profile?** If the brief has no profile, ask what the user builds, for whom and in which stores, one question at a time, and save it with `save_my_profile`.
3. **Dig where it moved.** For a search that dropped out of the top 10, `get_my_apps` with `app_id` and `include_history: true` shows the daily positions; `get_competitor_report` shows who took the spot and whether they changed their listing that week.
4. **Last week's work.** `get_app_tips` per app lists open tips and, in `done`, tips the user marked earlier with whether ranks moved (average position 7 days before vs 3-14 days after).
5. **Pick and close.** Ask the user which one or two tips they will do this week. When they say a change is shipped, call `mark_tip_done` with `app_id`, `tip_id` and `country`.

## Output

```
Week of <date>

Moved
- "<search>" (<App>, <store>): #<from> -> #<to>

Competitors
- <Competitor>: <what changed>

Did last week's changes help?
- <tip>: average #<before> -> #<after> | too early

Market (your categories)
- New earner: <App>, ~<range> per month estimated, <age> months old

This week
1. <top tip, with the ready text>
2. <second>
```

Keep it under a screen. Lead with what changed, not with what stayed the same.

## Rules

- Revenue figures are estimates; say "estimated" and give the range.
- A rank move on the same day as a competitor's change is a correlation, not proof.
- Tips marked done less than 7 days ago are "too early to tell".
- `mark_tip_done` and `save_my_profile` change the user's account; only call them on the user's word.
