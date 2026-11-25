---
name: fledly-metadata-rewrite
description: Rewrite an iOS app's App Store title, subtitle and 100-character keyword field with Fledly's MCP tools so they fit Apple's limits and carry the best searches without wasted words. Use when the user asks to write, rewrite or optimize their App Store name, subtitle or keyword field, asks whether their metadata fits Apple's character and byte limits, or is preparing a version update's listing text.
---

# Title, subtitle and keyword field with Fledly

Writes App Store texts that Apple accepts and that index the most valuable searches. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Apple's limits (per localization)

- Title (app name): 30 characters. Indexed for search, the strongest field.
- Subtitle: 30 characters. Indexed.
- Keyword field: 100 characters, comma-separated, no spaces after commas. Indexed. Hidden from users.
- Promotional text 170 characters and description 4000 characters: not indexed for search.
- Apple combines words across title, subtitle and keyword field, so a word only needs to appear once. Plurals and the app's own name, category name and "app" waste space.

## Steps

1. **Collect the current texts.** From the user, the project (`fastlane/metadata/<locale>/name.txt`, `subtitle.txt`, `keywords.txt`) or `get_app` (title and subtitle only; Apple does not publish the keyword field). Note the `locale`.
2. **Check what is there.** Call `check_metadata` with title, subtitle, keywords and locale. List its errors (over limit) and warnings (repeated or wasted words).
3. **Pick the searches.** Use tracked searches from `get_my_apps`, Fledly's ready text from `get_app_tips` (its `fields` already fit the limits), or run the `fledly-keyword-research` skill first if there is no list yet.
4. **Draft title and subtitle.** Brand plus the most valuable search in the title (`Brand: main search` or `Brand - main search`), the next search in the subtitle. Write for people too: the subtitle is what they read in search results.
5. **Build the keyword field.** Call `build_keyword_field` with scored `candidates` (higher score = more valuable), the drafted `title` and `subtitle`, `locale`, the brand as `app_name` and any `must_include` words. It skips words already in the title and subtitle and packs single words into 100 bytes.
6. **Verify.** Call `check_metadata` again on the final set. Do not hand over text that fails it.

## Output

```
Locale: en-US
Title     "<text>"  <n>/30
Subtitle  "<text>"  <n>/30
Keywords  "<text>"  <n>/100 characters
check_metadata: passes | <issues>
Changed: <one line per change and the search it targets>
```

If the project has fastlane metadata, offer to write the three files. After the user ships the change, offer `mark_tip_done` for the matching tip so Fledly can check on day 7 whether ranks moved.

## Rules

- The keyword field limit is 100 characters, as App Store Connect counts it: ä, é, kana and kanji count once each.
- No competitor brand names or trademarks in any field (App Review Guideline 2.3.7).
- No claims the app cannot back ("#1", "best") in the title or subtitle.
- Rank changes take days to show. Do not promise a ranking.
