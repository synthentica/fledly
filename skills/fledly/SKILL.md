---
name: fledly
description: iOS App Store market research and App Store Optimization (ASO) with Fledly's MCP tools. Use when the user asks which new iPhone apps already make money, what app to build next or whether an app idea is worth building, what is on the App Store top charts, how much an app earns, App Store keyword research (which searches to target, keyword popularity and difficulty, building the 100-byte keyword field, checking title and subtitle limits), where an app ranks for a search, daily App Store rank tracking, or what competitors changed in their listings.
---

# Using Fledly

Fledly answers questions about the iOS App Store from data it collects every day: young apps that already earn, scored app ideas, top charts, App Store search results and the user's own tracked apps. It works through Fledly's hosted MCP server at `https://fledly.app/mcp`. Tool names depend on the client (for example `get_app`, `fledly_get_app` or `mcp__fledly__get_app`); this guide uses the bare names.

## If the Fledly tools are missing

The tools come from the MCP server, not from this skill. If none are available, tell the user to add `https://fledly.app/mcp` as a remote MCP server and sign in with a Fledly account (a free account works; no API key):

- Claude Code: `claude mcp add --transport http fledly https://fledly.app/mcp`, then `/mcp` to sign in.
- Cursor: add `{"mcpServers": {"fledly": {"url": "https://fledly.app/mcp"}}}` to `~/.cursor/mcp.json`.
- Claude.ai, ChatGPT and other clients: add a custom connector with the same URL.

Setup for every client: https://fledly.app/docs/mcp/. If a tool says it needs authorization, ask the user to sign in again from their client's MCP menu.

## Which tool answers what

Market and ideas:

- "What new apps make money?" → `find_young_earners` (filter by `genre`, `max_age_months`, `min_monthly_revenue_usd`; page with `offset`).
- "What app should I build?" → `list_app_ideas` with `source: "proven"`, then `get_app_idea` for the apps, prices, complaints and score behind one idea. `save_idea` records the user's status for an idea.
- "What's on top of the charts?" → `get_top_charts`.
- One app (metadata, ratings, chart ranks, estimated revenue) → `get_app`, which accepts an App Store id, an apps.apple.com link or a name.

Keywords and ranks:

- "Where does my app rank for X?" → `search_app_store` with `app_id`.
- Keyword ideas for an app → `suggest_keywords`.
- Checking texts before submitting (title and subtitle 30 characters, keyword field 100 bytes, wasted words) → `check_metadata`.
- Packing the best words into the keyword field → `build_keyword_field`.
- Daily tracking → `track_app`, then `track_keywords`; read results later with `get_my_apps`. `untrack_keyword` stops one search.
- Competitors → `track_competitor`, then `get_competitor_report` for their listing changes, ranking gaps and words they use that the user's app does not. `untrack_competitor` stops one.
- What to change in the user's own listing → `get_app_tips`; after making a change, `mark_tip_done` with the tip id.
- The user's own downloads, proceeds and MRR (Pro and Studio, App Store Connect connected on fledly.app) → `get_my_numbers`. These are real reported numbers, not estimates.
- Whether ChatGPT, Claude and Gemini recommend the user's app (Pro and Studio) → `get_ai_visibility`.
- Plan, limits and usage → `get_account`.

The user and their week:

- Start a chat about the user's own apps with `get_my_apps`: it returns their saved profile (what they build, for whom, categories, stores, stage, goal).
- No profile yet → ask one question at a time and save the answers with `save_my_profile`, in the user's own words. Never fill in what they did not say.
- "What happened this week?" or a Monday check-in → `get_weekly_brief`: searches that moved, competitors' changes, the top tip per app, and new young earners and ideas in the user's categories.

`track_*`, `untrack_*`, `save_idea`, `save_my_profile` and `mark_tip_done` change the user's Fledly account; the other tools only read.

## Focused skills

For a full workflow, these skills in the same package walk through the tool calls step by step: `fledly-aso-audit` (scored listing review and fixes), `fledly-keyword-research`, `fledly-metadata-rewrite` (title, subtitle and keyword field within Apple's limits), `fledly-competitor-watch`, `fledly-app-idea-validation`, `fledly-launch-plan`, `fledly-localization` (cross-localization), `fledly-weekly-review`, `fledly-subscription-pricing`, `fledly-market-pulse`, `fledly-my-numbers` (your own App Store Connect and RevenueCat numbers) and `fledly-ai-visibility` (do AI assistants recommend your app).

## Good habits

- When the user is working on an iOS project, the app's App Store id is often in the project (fastlane metadata, App Store Connect links). Use it with `get_app`, `search_app_store` and `get_my_apps`.
- Revenue figures are Fledly estimates from chart positions; say so when quoting them.
- Market lists cover 23 App Stores: us, gb, de, ca, au, fi, jp, kr, fr, es, it, br, mx, nl, se, ch, tw, hk, th, vn, in, sa and ae. Live lookups and searches work in any App Store country.
- A search or keyword set Fledly has not collected yet is queued for the next daily run. Tell the user to check back tomorrow instead of retrying.
- If a result says the free plan limited it, say how many results the user saw and that the full list is on paid plans at https://fledly.app/pricing. Do not push upgrades beyond that.
