---
name: fledly-localization
description: App Store localization and cross-localization for an iOS app with Fledly's MCP tools - which languages each storefront indexes, extra 100-byte keyword fields from a second localization, and translated titles and subtitles checked against Apple's limits. Use when the user asks which App Store languages to add, how to rank in another country, how to get more keyword space, what cross-localization is, or wants to localize their App Store listing.
---

# Localization and cross-localization with Fledly

Most App Stores index more than one localization. A second localization gives the app another title, subtitle and 100-byte keyword field in that store, even if the app itself is not translated. Needs Fledly's MCP server (`https://fledly.app/mcp`); if its tools are missing, follow the setup in the `fledly` skill.

## Which localizations a storefront indexes

From Apple's App Store Connect Help ("App Store localizations"), as Fledly uses it; check the current page before relying on a row:

| Store | Indexed localizations |
| --- | --- |
| us | en-US, es-MX, ar-SA, zh-Hans, zh-Hant, fr-FR, ko, pt-BR, ru, vi |
| gb | en-GB |
| ca | en-CA, fr-CA |
| au | en-AU, en-GB |
| de | de-DE, en-GB |
| fr | fr-FR, en-GB |
| es | es-ES, ca, en-GB |
| it | it, en-GB |
| nl | nl-NL, en-GB |
| se | sv, en-GB |
| ch | de-DE, en-GB, fr-FR, it |
| fi | en-GB, fi |
| jp | ja, en-US |
| kr | ko, en-GB |
| tw | zh-Hant, en-GB |
| mx | es-MX, en-GB |
| br | pt-BR, en-GB |

Fledly's market lists also cover hk, th, vn, in, sa and ae; look their rows up in App Store Connect Help before advising on them.

## Steps

1. **Current stores.** `get_my_apps` shows the app's tracked countries. Ask which stores matter for revenue.
2. **Tips Fledly already has.** `get_app_tips` per country returns `extra_locale` tips (a second keyword field ready to paste, with its locale) and `localize` tips (the listing shows US texts in a store that indexes other languages).
3. **Local searches.** For each target store, `suggest_keywords` and `search_app_store` with that `country`: local users search in their own language, and the top 10 can be much weaker than in the US.
4. **Write each localization.** Translate the meaning of the searches, not word for word. Build each keyword field with `build_keyword_field` (`locale` set) and verify with `check_metadata` in the same `locale`. Do not repeat words across the localizations a store indexes: Apple combines them.
5. **Track.** With the user's OK, `track_app` adds the new countries and `track_keywords` the local searches, so the results show up in a week.

## Output

Per store: the localizations to fill, the role of each (main language, extra keyword field), and the texts:

```
us: en-US (main) + es-MX (extra keyword field)
  es-MX keywords "<text>"  <n>/100 bytes  check_metadata: passes
```

Then the order to do them in, biggest store and weakest competition first.

## Rules

- A cross-localization field must still be honest: words that describe the app. Unrelated words risk rejection.
- Byte counts differ by script: Chinese, Japanese, Korean, Arabic and accented letters take 2-3 bytes each.
- Ranks from a new localization show after Apple reindexes the version, usually days. Do not promise results.
