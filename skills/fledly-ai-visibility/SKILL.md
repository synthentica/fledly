---
name: fledly-ai-visibility
description: Check whether ChatGPT, Claude and Gemini recommend an iOS developer's own app with Fledly's MCP tools - mention rate, position among the apps named, share of voice against competitors, the answers and their sources, and the weekly trend - then plan what to change. Use when the user asks whether AI assistants recommend their app, how to show up in ChatGPT answers, AI search visibility or generative engine optimization (GEO) for their app.
---

# AI visibility with Fledly

Every week Fledly asks ChatGPT, Claude and Gemini, with web search on, the questions the user's customers would ask ("What is the best habit tracker app for iPhone?", "alternatives to <competitor>"), and records whether the user's app is named. Needs Fledly's MCP server (`https://fledly.app/mcp`) and a Pro or Studio plan with AI visibility turned on for the app (fledly.app, My apps, AI visibility). If the tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Which app.** `get_my_apps`, then `get_ai_visibility` with `app`.
   - `locked: true`: say it is on Pro (1 app, 5 questions, ChatGPT and Gemini) and Studio (3 apps, 15 questions, every engine), once, with https://fledly.app/pricing.
   - `enabled: false`: tell the user to turn it on in My apps, AI visibility; the first answers arrive within the hour.
2. **Read the score.** `score.rate` is the share of unbranded questions where the app was mentioned, `score.avg_position` its place among the apps named, `score.by_engine` the same per assistant, `score.share_of_voice` how often each app is named.
3. **Read the answers.** For each question in `questions`, look at which apps were named instead and which `sources` the assistants cited. Sources that recommend competitors but not the user's app are the places to get onto (review sites, "best apps" lists, Reddit threads, comparison posts).
4. **Look at the trend.** `trend` has the weekly mention rate per engine. One week can swing; three weeks is a direction.
5. **Plan.** Combine with `get_competitor_report` (what the named competitors do differently) and the user's own site and App Store listing.

## Output

```
<App>: mentioned in <rate> of answers (week of <date>)
ChatGPT <m>/<n> · Claude <m>/<n> · Gemini <m>/<n>; average position <p>

Who gets named instead: <competitor> (<share>), …
Sources the assistants used: <domain>, <domain>, …

Questions where you're missing
- "<question>": <engines> named <apps>

What to do
1. <get listed on a cited source / publish a comparison page / fix the App Store description so it says the job plainly>
2. …
```

## Rules

- Each assistant answers each question once a week as a new chat: one answer is a sample, not a ranking. Talk about the trend.
- Questions that name the app (`branded`) say little about discovery; they're shown apart from the score.
- Don't promise that a change will make an assistant recommend the app. Point to the sources the assistants actually cited.
- No fake reviews, paid placements dressed as reviews, or posts that pretend to be users.
