"""Builds data/index.json and data/batch-NN.json (30 days each) from content/*.yaml.
Day N uses riddle N of each tier. Run: python3 tools/build.py"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__)); from load import load
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START = "2026-11-17"; BATCH = 30
TIERS = [('e', 'easy'), ('m', 'medium'), ('h', 'hard'), ('i', 'invictus')]

def clean(r):
    out = {l: {k: r[l][k].strip() for k in ('title', 'q', 'hint', 'a')} for l in ('en', 'pt')}
    if 'answer' in r:
        out['ans'] = [float(x) for x in r['answer']]
        if 'tol' in r: out['tol'] = float(r['tol'])
    return out

tiers = {k: [clean(r) for r in load(os.path.join(ROOT, 'content', f'{name}.yaml'))] for k, name in TIERS}
days = min(len(v) for v in tiers.values())
for k, v in tiers.items():
    if len(v) != days: print(f'note: tier {k} has {len(v)} riddles, only {days} days are complete')
os.makedirs(os.path.join(ROOT, 'data'), exist_ok=True)
for f in os.listdir(os.path.join(ROOT, 'data')):
    if f.startswith('batch-'): os.remove(os.path.join(ROOT, 'data', f))
nb = (days + BATCH - 1) // BATCH
for b in range(nb):
    chunk = [{k: tiers[k][d] for k, _ in TIERS} for d in range(b * BATCH, min(days, (b + 1) * BATCH))]
    with open(os.path.join(ROOT, 'data', f'batch-{b+1:02d}.json'), 'w', encoding='utf-8') as fh:
        json.dump(chunk, fh, ensure_ascii=False, separators=(',', ':'))
with open(os.path.join(ROOT, 'data', 'index.json'), 'w') as fh:
    json.dump({'start': START, 'days': days, 'batch': BATCH, 'batches': nb}, fh)
print(f'built {days} days in {nb} batches')
