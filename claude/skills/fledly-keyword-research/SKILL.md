---
name: fledly-keyword-research
description: App Store keyword research for an iOS app with Fledly's MCP tools - which searches to target, how crowded each one is, where the app ranks now, and which ones to start tracking. Use when the user asks what keywords or searches to target, how to rank for a term, which searches competitors rank for, or wants a shortlist of App Store search terms for a new or live app.
---

# App Store keyword research with Fledly

Turns public App Store signals into a ranked shortlist of searches. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Context.** Call `get_my_apps` for the user's profile and tracked apps. Note the main store (first country). For an app not on the App Store yet, ask for the planned name, the job it does and two or three competitors.
2. **Candidate searches.** Call `suggest_keywords` with the app's `app_id`, `country` and its `subtitle` if known. It returns phrases from the app's own name, App Store autocomplete for them and phrases the closest competitors put in their titles. Pre-launch: run `suggest_keywords` on the competitors' ids instead and merge the lists.
3. **Look at each serious candidate.** For the 8-15 most relevant phrases, call `search_app_store` with `term`, `country` and `app_id`. Read the top 10: how many ratings the top apps have, how old they are, whether big brands hold it, and the user's own position. A top 10 of apps with a few hundred ratings is winnable; one full of 100k-rating brands is not, for now.
4. **Competitor gaps.** If competitors are tracked, `get_competitor_report` shows `searches` where a competitor is in the top 10 and the user is not (`gap: true`) and `word_gaps` (words in competitors' names and subtitles the user does not use).
5. **Track the shortlist.** With the user's OK, `track_app` (if not tracked yet) and `track_keywords` with up to 25 terms. A term Fledly has not collected yet is queued for the next daily run.

## Output

A table, best opportunities first:

| Search | Relevance | Top 10 strength | Your rank | Why |
| --- | --- | --- | --- | --- |
| habit tracker adhd | high | weak (top app 900 ratings) | 34 | long tail, matches the app's job |

Then: the 5 searches to put in the title or subtitle, the words for the keyword field (hand them to the `fledly-metadata-rewrite` skill or `build_keyword_field`), and which searches are now tracked.

## Rules

- Fledly's `popularity` is an estimate from public signals (autocomplete, search results), not Apple's search volume. Say so. Never invent volumes.
- Rank only what you looked up. "Not in the top 50" is different from "no data"; queued means "check back tomorrow".
- Relevance beats popularity: a search the app does not answer converts badly and Apple ranks it down.
- One store at a time. A search that is easy in `fi` can be crowded in `us`.
- `track_keywords` and `untrack_keyword` change the user's account; ask first.
