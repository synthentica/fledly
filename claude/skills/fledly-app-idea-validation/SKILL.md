---
name: fledly-app-idea-validation
description: Validate an iOS app idea against App Store market data with Fledly's MCP tools - proven ideas, young apps that already earn in the niche, their prices and complaints, search competition, and red flags - ending in a build, consider or skip verdict. Use when the user asks whether an app idea is worth building, what app to build next, whether a niche makes money, or wants evidence before starting a new app.
---

# App idea validation with Fledly

Checks an idea against what already earns on the App Store and gives an honest verdict. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Profile.** Call `get_my_apps` for what the user builds, for whom and in which stores. If there is no profile, ask one question at a time and save the answers with `save_my_profile`, in the user's words.
2. **Does Fledly already score it?** Call `list_app_ideas` with `source: "proven"` and a `query` of the idea's key words (and `genre` if clear). If there is a match, call `get_app_idea` with its `idea_id`: the score breakdown, the apps that prove it, their prices and top complaints.
3. **Who earns in the niche.** Call `find_young_earners` with `query` and/or `genre`, `max_age_months` (12-24) and the user's main `country`. Young apps that earn show the niche is open to newcomers. Look at `revenue_month_usd_estimate`, `ratings_per_month`, `business_model`, `prices` and `top_complaints`.
4. **Check the big players.** For the two or three apps that matter, `get_app` gives ratings, release date, update cadence and chart ranks.
5. **Search competition.** For the two or three searches a user would type to find this app, `search_app_store`: are the top 10 old giants or young apps with few ratings?
6. **Record it.** With the user's OK, `save_idea` with the idea id and a status (`interested`, `researching`, `building`, `rejected`) and a short note.

## Red flags to check every time

- `estimate_confidence: "low"`, `paid_traffic_suspected`, `lookalike_name`, `reissued_listing` or `licensed_ip` on the apps that "prove" the idea.
- All the earners are one developer, or one app holds nearly all the revenue.
- Earners have thousands of ratings a month: the niche is a marketing race, not an ASO one.
- Complaints show the job needs things a solo developer cannot ship (hardware, licensed content, a large backend, medical claims).
- The idea needs a brand, a network effect or regulated data (health, finance, kids) to work.

## Output

```
Idea: <one line>
Verdict: build | consider | skip  (<one sentence why>)

Evidence
- Fledly idea score: <n> (<idea title>) | no scored idea matched
- Young earners: <n> apps under <m> months, <range> estimated per month
- Price points: <prices seen>
- What users complain about: <top complaints = the opening>
- Search competition: "<search>" top 10 = <weak | mixed | strong>

Red flags: <list or "none found">
Wedge: <the specific angle that answers the complaints>
Next step: <one concrete action>
```

## Rules

- Revenue figures are Fledly estimates from chart positions, with a range. Always say "estimated" and give the range, never a single exact figure.
- Say so plainly when the evidence is weak or the idea is crowded. Skip is a useful answer.
- Past earnings of other apps are not a promise of the user's earnings.
