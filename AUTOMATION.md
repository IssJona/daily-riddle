# Adding new riddles (monthly batch)

The app shows 4 riddles per day (easy, medium, hard, invictus), starting on `START` in `tools/build.py` (2026-11-17 = day 1).
Day N uses riddle N from each of `content/easy.yaml`, `medium.yaml`, `hard.yaml`, `invictus.yaml`.

## Procedure

1. Work out how many days are covered: `python3 -c "import json;print(json.load(open('data/index.json'))['days'])"`.
   Today's day number = (today − 2026-11-17) + 1. Keep the data **at least 45 days ahead of today**: append batches of 30 days until it is.
2. **Append** (never reorder or edit existing entries; past days must not change) 30 new riddles to **each** of the four YAML files, following the existing format exactly:
   - `en` and `pt` (European Portuguese, not Brazilian) with `title`, `q`, `hint`, `a`.
   - `answer: [numbers]` (+ optional `tol`) whenever the answer is a single number. **Every invictus riddle must have one.**
   - Do not repeat a riddle (or a thin variation of one) that already appears in any of the four files. Read all titles first.
   - Difficulty: easy = classic quick riddles (e.g. three light switches); medium = needs real thought (knights & knaves, 100 doors);
     hard = 12-coin-weighing level; invictus = multi-step calculation, the kind that needs paper (combinatorics, probability,
     number theory, geometry, expected values).
   - Fit the hint to the riddle and make the solution explain the reasoning, not just the number.
3. For **every new invictus riddle** (and any new numeric medium/hard riddle you can), add an independent computation to the
   `EXPECT` dict in `tools/verify.py`, keyed by the English title. Then run `python3 tools/verify.py`; it must print `problems: 0`.
   If a check fails, fix the riddle (not the check) unless the check itself is wrong.
4. Run `python3 tools/build.py` (needs `pip install pyyaml`).
5. Bump `VERSION` in `sw.js` (e.g. "v2" → "v3").
6. Commit to `main` with a message like "Add riddles for days 61–90" and push. GitHub Pages redeploys automatically.
