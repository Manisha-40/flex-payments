# Flex · Financial Flexibility Intelligence

A functional, dependency-free, mobile-first prototype with seeded transactions, protected categories, possible paths, payday planning, spend capture, freemium limits and an optional Gemini intent layer. No bank connection or money movement.

The root page is a research-led landing experience covering the problem, whitespace, market signals, personas, opportunity horizons, user-flow cases, competitive positioning, risks and the future Paytm partnership hypothesis. The functional application remains available at `/prototype.html`, and the landing page shows live desktop and phone views side by side. All prototype links are same-origin relative links: locally they resolve to `localhost`, while a Vercel deployment automatically resolves them to `https://your-project.vercel.app/prototype.html`.

## Product experience

- Animated Flex-dot splash followed by a prototype PIN/fingerprint lock. Demo PIN: `2468`. This is a user-flow simulation, not production authentication. Real device biometrics require WebAuthn/passkeys, verified accounts and server-side authorization.
- Four touch-first areas: Home, What if, Activity and Payday. Buttons include visual press feedback and request a short vibration on browsers/devices that support the Vibration API. iOS Safari does not currently provide this web vibration behavior.
- One responsive product serves both form factors. Phones use stacked cards and fixed bottom navigation; desktop widths use a persistent left workspace rail, wider summaries, two-column activity/payday views and three side-by-side scenario paths.
- Free concept tier: current and previous month visibility plus three What if simulations per device/day. Flex+ concept: 12-month patterns, annual goals, unlimited scenarios and custom payday cycles. The ₹99/month price is a research hypothesis; the prototype collects no payment or contact details.
- Voice capture uses the browser Speech Recognition API when supported, then fills a form for review before saving. Unsupported browsers fall back to the form.
- CSV import accepts up to 50 spending rows with `date, merchant, category, amount`. Parsing starts on-device; saved state follows the same local/Supabase mode as the rest of the demo. CSV parsing is intentionally simple and is not a production connector to Paytm, Fi, bank accounts or other providers.
- Payday Pocket tracks repetitive commitments such as rent, household help and an existing SIP commitment. It reports what remains and does not recommend, create or change an investment.
- Hooked-model elements: payday and decision moments act as triggers; capture and scenario comparison are the actions; daily insights and knowledge games supply variable informational rewards; saved preferences, history and “sparks” represent investment. Rewards celebrate learning and consistency, never additional spending, borrowing or financial-product purchases.

The daily limit is enforced in device storage for this prototype and can be reset by clearing browser data. Production must enforce plan entitlements and quotas on the server. The fingerprint control is explicitly a preview; it does not access or validate a biometric.

Product direction: see [PRODUCT_STRATEGY.md](PRODUCT_STRATEGY.md) for the target-user hypothesis, CIRCLES decisions, Double Diamond research plan, 5C context and 4P positioning. Technical feasibility has been demonstrated; user demand has not yet been validated.

## Run locally

Requires Node.js 22 or later. From this directory:

```sh
npm run build
npm test
npm start
```

Open http://localhost:3000. No credentials are needed for the demo. Preferences and path choices survive reloads in browser storage. Natural-language demo mode supports an explicit rupee amount (including `20k`) and simple category protections. It is labelled as a parser, not AI.

## Deploy to Vercel

1. Put this `flex` directory into a GitHub repository (or set `flex` as the Vercel root directory for a repository containing this folder).
2. Import the repository into Vercel. Choose **Other**, build command `npm run build`, output directory `public`. The `api/*.js` routes are Node.js serverless functions. No install dependencies are required.
3. Create a Supabase project. Run `schema.sql` once in its SQL Editor.
4. Add the following environment variables in Vercel Project Settings for the desired environments. Redeploy after changing them.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Current `sb_secret_...` server-only database credential; never paste into browser files. The older `SUPABASE_SERVICE_ROLE_KEY` name remains supported as a temporary fallback. |
| `SESSION_SECRET` | Random secret, at least 32 bytes, to sign anonymous demo sessions |
| `GEMINI_API_KEY` | Server-only Google AI Studio API key |
| `GEMINI_MODEL` | Supported Gemini model with structured JSON output; default `gemini-3.8-flash`, verify model access in your account |

Generate a session secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Store only the output in Vercel. Never commit secrets. `.env.example` is a template; local Node can load a filled `.env` with `node --env-file=.env server.mjs`.

5. Enable Vercel deployment protection or equivalent access control for the assignment demo before enabling the paid Gemini endpoint. The per-session 20/hour limit is best-effort and does not stop creating new sessions; it is not a production abuse defence. Set Google API quotas/budget alerts too.
6. Smoke-test: cloud saved badge; change goal and reload; protect dining; ask the Goa question after checking consent; verify Gemini connected status; try an investment question; inspect Supabase state/log rows; save and dismiss a path. Inspect your browser network responses to confirm neither service credential nor Gemini key is returned.

Credentials and deployment-account access were not supplied, so live integrations and publishing must be completed with your accounts. Provider errors are displayed; the app never silently reports an AI failure as a Gemini success.

## Architecture: exactly where each component fits

```text
Browser UI
  ├─ deterministic previews and local demo storage
  └─ same-origin /api endpoints on Vercel
       ├─ signed HttpOnly demo cookie → isolated session identity
       ├─ Supabase REST → saved state + interaction logs
       ├─ Gemini API → structured expense intent + protected categories
       └─ deterministic financial engine → verified numbers + safe explanation
```

Supabase is the database and memory layer, not the AI or web host. `flex_states.state` stores seeded transactions, income, savings goal and protections; `flex_logs` stores scenario metadata, AI request counters and saved/dismissed choices. Raw questions and transaction lists are not sent to Gemini or stored in logs. Gemini sees only the question and permitted category identifiers. This prototype uses a server-rendered deterministic explanation of the verified calculation, rather than letting a model invent financial numbers.

`GEMINI_API_KEY` authenticates Vercel's server-to-server call to Google; it never belongs in a `NEXT_PUBLIC_*`, `VITE_*`, HTML or browser JavaScript variable. Supabase's service credential also stays in server environment variables. RLS is enabled with no browser access policies; the backend's service role bypasses RLS and therefore the signed cookie—not a supplied user ID—determines every database lookup. Sessions are anonymous isolated demo users, not verified customer accounts. Clearing cookies creates a new demo identity. A later production account system should use Supabase Auth and verified user identity.

## Financial model and guardrails

Illustrative October 2026, viewed as of 15 October. Monthly income ₹90,000, expected category spending ₹54,000, savings ₹36,000, savings goal ₹30,000. Already spent is ₹37,400; remaining budget is ₹16,600. A ₹20,000 expense produces ₹16,000 savings, ₹14,000 below goal.

- Baseline savings = income − monthly category budgets. Do not subtract spent transactions again.
- New expense = an additional one-time expense in the same month, not a replacement for budgeted spending.
- Flexible path cuts at most 30% of each flexible category budget, capped at unspent budget. No cuts to housing, groceries, transport, or user-protected categories.
- Smaller-expense path removes the goal gap from the expense down to zero. When baseline is already below goal, even zero new spending cannot restore it; displayed savings preserve that limitation.
- All paths remain visible; no ranking, affordability guarantee or automatic acceptance. Negative savings are preserved.
- Investment, lending and insurance terms trigger a scope boundary before Gemini; Gemini also classifies scope and ambiguous amounts. All output is schema checked and amount/category validated. No model prose enters the result UI.
- Choice logging does not mutate the budget. Reset restores preferences but retains cloud audit logs.
- This is not a legal determination or evidence of regulatory compliance. Production needs India-specific legal/privacy review, consent/retention/deletion design, complete financial data, Supabase Auth, stronger abuse controls and concurrency-safe quotas. Keyword filtering can be evaded and is only one guardrail.

## ChatGPT Work versus Claude Code + Vercel

Both can help write, revise and test the application code. Vercel hosts the resulting app; Supabase persists data; Gemini provides language interpretation. You can build here in ChatGPT Work, put these files in GitHub and deploy to Vercel directly. Claude Code is an alternative development environment, not a required intermediate step. Keep this repository as the handoff unit so either environment can maintain it. Choose whichever development workflow you prefer; the deployment architecture stays the same.

Official references: [ChatGPT learning and coding workflows](https://learn.chatgpt.com/), [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel environment variables](https://vercel.com/docs/environment-variables), [Gemini structured outputs](https://ai.google.dev/gemini-api/docs/structured-output), [Supabase RLS and service key boundaries](https://supabase.com/docs/guides/database/postgres/row-level-security).
