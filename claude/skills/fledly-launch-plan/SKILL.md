---
name: fledly-launch-plan
description: Pre-launch App Store plan for a new iOS app with Fledly's MCP tools - target searches ranked by how winnable they are, a draft name, subtitle and keyword field within Apple's limits, competitors and their prices, and a launch-week checklist. Use when the user is about to launch or submit a new iOS app, asks how to launch on the App Store, or wants their first listing and keyword plan before release.
---

# Launch plan with Fledly

Builds the first App Store listing and a launch checklist from market data. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Profile and app.** Call `get_my_apps`. If there is no profile, ask what the app does, for whom and in which stores, one question at a time, and save it with `save_my_profile` (`stage: "building"`).
2. **Get the app's Apple ID.** Once the app record exists in App Store Connect, its Apple ID (App Information > Apple ID, a 10-digit number) works before release. With the user's OK, `track_app` with that id and the launch stores (main store first).
3. **Candidate searches.** Pick 2-4 competitors (`get_app` by name, or from `find_young_earners` with the app's `genre`). Run `suggest_keywords` on each competitor's id and merge the phrases that fit the user's app.
4. **Track them.** `track_keywords` with the 10-25 best candidates. They are collected in the next daily run.
5. **Draft the listing.** Call `get_app_tips` with the `app_id`, `country` and the planned name as `app_name`. For an app Apple does not list yet it returns `prelaunch_searches` ranked by how winnable their top 10 is, plus a drafted name, subtitle and keyword field. Verify the final texts with `check_metadata` (use the `fledly-metadata-rewrite` skill for edits).
6. **Price check.** `get_app` on the main competitors and `get_app_idea` (if the idea is scored) show what the niche charges. See the `fledly-subscription-pricing` skill for a fuller pricing pass.
7. **Watch the competition.** With the user's OK, `track_competitor` for the 2-4 competitors so launch week shows what they change.

## Output

```
Launch plan: <App> in <stores>

Target searches (most winnable first)
1. "<search>": top 10 <weak|mixed|strong>, why it fits
...

Listing draft (<locale>)
Title     "<text>"  <n>/30
Subtitle  "<text>"  <n>/30
Keywords  "<text>"  <n>/100 characters

Competitors and prices
- <App>: <price points>, <rating> (<ratings> ratings)

Checklist
- [ ] Metadata passes check_metadata in every launch locale
- [ ] Extra localization keyword field where the store indexes two languages (fledly-localization skill)
- [ ] 3+ screenshots; the first two show the main job, with text that repeats the top search
- [ ] Privacy policy URL, support URL, age rating, privacy nutrition label filled
- [ ] Review prompt after a success moment, not on first launch (StoreKit requestReview)
- [ ] Day 1: get_my_apps shows first ranks; day 7: get_app_tips for the first live tips
```

## Rules

- Ranks for a new app take days to settle. Do not promise positions.
- Revenue and popularity figures are Fledly estimates; label them.
- No competitor brand names in metadata (App Review Guideline 2.3.7).
- `track_*` calls change the user's account and count against plan limits (`get_account`); ask first.
