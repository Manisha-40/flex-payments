# Flex: audience and product decision brief

Status: working hypotheses informed by the concept conversation. No customer interviews, willingness-to-pay study, partnership agreement or current competitive audit has been completed. The running prototype demonstrates feasibility, not product-market fit.

## For whom are we creating this?

Primary end user: salaried people in India with reasonably predictable monthly income, recurring obligations, a chosen savings goal and discretionary spending decisions. They want to understand a trade-off before spending without being judged or told to abandon routines they value.

The initial segment is behavioural: people who can describe a recent purchase decision where they struggled to reconcile spending, saving and personal priorities. Do not assume age, city or salary alone predicts this need. ₹90,000 income in the demo is an illustrative example, not an eligibility rule or validated typical income.

Illustrative persona: Aarav receives a monthly salary, pays recurring costs, wants to save ₹30,000 this month and is considering a ₹20,000 trip. Dinners with friends matter to him. His question is: “What changes if I take this trip while keeping those dinners?”

Job to be done: When I consider an extra expense, help me see its effect on my savings and compare changes I am willing to make, so I can choose with clearer expectations.

Potential buyer, separate from the end user: a personal-finance or payments platform that could embed this intelligence layer. This is a distribution hypothesis; Paytm is a reference environment, not an integration or partner. The standalone web app is the current demonstration surface.

Initial exclusions: investment selection, borrowing or insurance decisions; emergency debt relief; and comprehensive forecasting for irregular-income households. These require different information, models and safeguards. The exclusions concern this prototype's scope, not who deserves financial support.

## CIRCLES: how we choose the product

| Step | Application to Flex | Decision or evidence needed |
| --- | --- | --- |
| Comprehend the situation | Help with a specific prospective spending choice within a monthly savings plan. | Success means understanding consequences, not maximising spending or cross-selling products. |
| Identify the customer | Start with the salaried, goal-conscious segment above. Separate end users from platform buyers. | Validate which situations recur and who experiences the strongest unmet need. |
| Report customer needs | Understand the savings impact; preserve valued spending; compare paths; see assumptions; retain control and privacy. | These are hypotheses to test through recent real decisions. |
| Cut through prioritisation | Prioritise correct impact calculations, user protections and understandable alternatives. | Account aggregation, behavioural learning and broader life-event planning wait for evidence. |
| List solutions | Compare a simple impact calculator, a priorities-aware scenario experience, and proactive spending alerts. | Prototype the priorities-aware scenario experience; keep a simple calculator as the usability baseline. |
| Evaluate trade-offs | Natural language reduces input effort but introduces ambiguity and provider dependence; manual inputs are explicit. Seeded data is demonstrable but incomplete. | Keep manual entry, show interpreted inputs, clarify uncertainty and never delegate arithmetic to the model. |
| Summarise the recommendation | Test a spending-impact experience with user-controlled protections and several unranked paths. | Advance only if users understand the figures and find the alternatives useful. |

CIRCLES provides structure; it is not evidence that any need has been validated.

## Double Diamond: how we learn and iterate

Discover: interview an initial 6–8 people from the proposed segment about their most recent discretionary purchase. Ask what they considered, what information they lacked, what they would not change and how they reached a decision. Include people who already use spreadsheets or budgeting tools. Do not start by asking whether they like an AI finance app. This small sample informs early design, not market prevalence.

Define: synthesise recurring jobs, barriers and trust concerns. Select one high-value moment: an extra expense versus a savings target while preserving named priorities. Revise or reject the target segment if the evidence points elsewhere. Write the problem statement in the customer's language.

Develop: compare at least two approaches—a plain calculator and the current priorities-aware simulator. Test manual and natural-language input. Explore smaller expense, flexible-category changes and an explicit user-selected goal adjustment, rather than assuming spending cuts are universally desired.

Deliver: run observed tasks, fix misunderstandings and pilot with controlled access. Test: “Explore a ₹20,000 trip, preserve dining, and explain the savings gap.” Ask participants to explain the result before recording confidence. Do not measure success solely by whether they accept a proposed path.

Current position: a candidate solution exists in Develop. Discover and Define remain provisional; Deliver has technical checks but no user validation. Iterate between stages as evidence arrives.

Proposed pilot gates, not results: at least 4 of 5 participants can complete the task without coaching and explain the savings impact, protected categories and main assumptions. All automated calculation invariants must pass. Record any mistaken belief that the app guarantees affordability or moves money; treat that as a design defect to investigate.

## 5C: business context

| C | Working assessment | Implication |
| --- | --- | --- |
| Company | We have a prototype and a proposed intelligence layer, not a regulated finance institution or a proven distribution channel. | Demonstrate calculations and clarity; avoid claims of financial authority or validated demand. |
| Customers | End users seek spending clarity; potential platform buyers may seek a valuable decision-support experience. | Research both separately. Do not optimise end-user choices for buyer cross-sell. |
| Competitors | Alternatives include spreadsheets, mental arithmetic, budgeting tools and platform-native analytics. Specific product feature comparisons need fresh verification. | Test whether protected priorities and prospective trade-offs improve on the user's existing method. |
| Collaborators | Vercel, Supabase and Gemini are technical providers. A future platform or consented data provider could support distribution and context. | Provider APIs do not establish commercial partnerships or permission to access financial accounts. |
| Context / climate | Personal-finance data, incomplete information, trust, privacy expectations, regulation and AI operating costs shape viability. | Minimise data, disclose assumptions, review legal boundaries and validate operating economics before launch. |

## 4P: proposed marketing mix

| P | Proposed choice |
| --- | --- |
| Product | A spending-impact simulator centred on the user's savings goal and protected priorities. Demonstrate the result, not an “AI adviser” claim. |
| Price | Freemium hypothesis: two months of visibility and three daily scenarios on Free; annual patterns, yearly goals and unlimited scenarios on Flex+. ₹99/month is displayed only as a research prompt. Validate willingness to pay before setting a commercial price. No lending, investment or insurance referral incentives in this scope. |
| Place | Standalone web prototype for validation. Potential future embedding in a finance platform if user evidence, data access and partnerships support it. Vercel is infrastructure, not a customer acquisition channel. |
| Promotion | Show relatable decisions: “See the impact of a trip while keeping dinners with friends.” Evaluate whether this message attracts the intended users without implying guaranteed affordability. |

## Implications for the next prototype revision

1. Put expense, savings goal and priorities close together in the core flow; users should not need to discover priorities after seeing suggested cuts.
2. Show the interpreted amount and protections before a Gemini-derived scenario is calculated. Ask for clarification when ambiguous.
3. Label the 30% flexible-budget adjustment as an illustrative heuristic. Test editable changes rather than presenting this percentage as personalisation.
4. Show the remaining goal gap on each path. Do not imply every path meets the goal.
5. Offer explicit user control over any goal-adjustment scenario. Never automatically lower a savings target.
6. Research what “protected” means to users. Current locked categories are prototype defaults, not validated universal priorities.
7. Separate prototype controls from a future customer product: demo reset and connection status support evaluation but are not the value proposition.

This brief defines the direction for subsequent work; these seven revisions have not been implemented as part of writing it.

## Hooked-model application

The habit should improve awareness without manufacturing anxiety or encouraging extra spending.

| Hook stage | Flex implementation | Guardrail |
| --- | --- | --- |
| Trigger | Payday, a contemplated purchase, a recurring-cost due date or an optional daily check-in. | No shame-based alerts, false urgency or excessive notifications. |
| Action | Capture a spend, reveal its category, or run a What if scenario. | Keep the action reversible and show assumptions before choices. |
| Variable reward | Rotate useful monthly insights and short prediction games. Reward discovery rather than a prescribed financial outcome. | Never reward spending, borrowing, referrals to financial products or lowering a savings goal. |
| Investment | User-built categories, protected priorities, fixed-cost rhythm, saved paths and learning points (“sparks”). | User data must remain exportable/deletable; accumulated history should not become coercive lock-in. |

Prototype success should measure whether users understand their situation and return at relevant moments. Raw daily opens, streak length and upgrade clicks are secondary diagnostics, not the north-star outcome.

Framework references: [Lewis Lin's CIRCLES examples](https://www.lewis-lin.com/posts/mastering-product-design-interviews-2-examples-using-lewis-lins-circles-method/), [Design Council Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), [5C overview](https://www.productmarketingalliance.com/how-to-conduct-a-5c-analysis-2/), [AMA Four Ps](https://www.ama.org/marketing-news/the-four-ps-of-marketing/).
