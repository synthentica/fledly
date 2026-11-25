---
name: fledly-ai-visibility
description: Check whether ChatGPT and Claude recommend an iOS developer's own app with Fledly's MCP tools - mention rate, position among the apps named, share of voice against competitors, the answers and their sources, and the weekly trend - then plan what to change. Use when the user asks whether AI assistants recommend their app, how to show up in ChatGPT answers, AI search visibility or generative engine optimization (GEO) for their app.
---

# AI visibility with Fledly

Every week Fledly asks ChatGPT and Claude, with web search on, a few questions that are real buying decisions ("What is the best habit tracker app for iPhone?", "a good <competitor> alternative for iPhone"), and records which apps they recommend and whether the user's app is among them. A few real buying questions beat many variants of one. Needs Fledly's MCP server (`https://fledly.app/mcp`) and a Pro or Studio plan with AI visibility turned on for the app (fledly.app, My apps, AI visibility). If the tools are missing, follow the setup in the `fledly` skill.

## Steps

1. **Which app.** `get_my_apps`, then `get_ai_visibility` with `app`.
   - `locked: true`: say it is on Pro (1 app, 5 questions, ChatGPT and Claude) and Studio (3 apps, 15 questions, ChatGPT and Claude), once, with https://fledly.app/pricing.
   - `enabled: false`: tell the user to turn it on in My apps, AI visibility; the first answers arrive within the hour.
2. **Who they recommend instead.** Start with `recommended_instead`: every app the assistants named, its share of answers and average position, the user's rank among them (`your_rank`), apps new since last week (`vs_last_week: "new"`) and `dropped_since_last_week`. Then `score.rate` (share of unbranded questions where the app was mentioned) and `score.by_engine`.
3. **Read the answers.** For each question in `questions`, look at which apps were named instead and which `sources` the assistants cited. Sources that recommend competitors but not the user's app are the places to get onto (review sites, "best apps" lists, Reddit threads, comparison posts).
4. **Look at the trend.** `trend` has the weekly mention rate per engine. One week can swing; three weeks is a direction.
5. **Plan.** Combine with `get_competitor_report` (what the named competitors do differently) and the user's own site and App Store listing.

## Output

```
<App>: mentioned in <rate> of answers (week of <date>)
ChatGPT <m>/<n> · Claude <m>/<n>; average position <p>

Who the AIs recommend: 1. <app> (<share> of answers, avg #<pos>) 2. … You: #<rank> of <n>
New this week: <apps> · Dropped: <apps>
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
- Suggest new questions only if they are real buying decisions; don't fill the plan's limit with variants of one question.
- Don't promise that a change will make an assistant recommend the app. Point to the sources the assistants actually cited.
- No fake reviews, paid placements dressed as reviews, or posts that pretend to be users.
