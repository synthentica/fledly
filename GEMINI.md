# Fledly

Fledly gives you iOS App Store market data through the `fledly` MCP server: young apps that already earn, app ideas scored from market data, top charts in 23 App Stores, App Store search and lookup, keyword suggestions, metadata checks, competitor tracking, and the user's own app and keyword rank tracking.

- Sign-in: if a Fledly tool fails with an authentication error, ask the user to run `/mcp auth fledly` and sign in with their Fledly account. A free account works: https://fledly.app
- When the chat is about the user's own apps or plans, call `get_my_apps` first. It returns the saved profile.
- Revenue and download numbers are estimates. Say so when you quote them.
- The skills in this extension (for example `fledly-aso-audit`, `fledly-keyword-research`, `fledly-app-idea-validation`, `fledly-weekly-review`) describe multi-step workflows. Use the matching skill when the task fits.
