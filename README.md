# Daily Riddle

Four new math & logic riddles every day (Easy · Medium · Hard · Invictus), in English and Portuguese.
Installable web app (PWA) hosted on GitHub Pages: https://issjona.github.io/daily-riddle/

- `index.html`, `app.js`: the app. `firebase.js`: Google sign-in, synced progress and the ranking (Firebase).
- `content/*.yaml`: the riddles (source). `data/`: generated JSON the app loads. Rebuild with `python3 tools/build.py`.
- `tools/verify.py`: re-computes every numeric answer independently.
- `firestore.rules`: database security rules (paste into Firebase console → Firestore → Rules).
- `AUTOMATION.md`: how new monthly batches are added.
