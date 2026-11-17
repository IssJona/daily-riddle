"""Loads content/*.yaml. Single-line title/hint values are auto-quoted, so they may contain ':' or quotes."""
import re, json, yaml
LINE = re.compile(r'^(\s+)(title|hint): (?!\|)(.*)$')
def load(path):
    out = []
    for line in open(path, encoding='utf-8').read().split('\n'):
        m = LINE.match(line)
        if m:
            line = f'{m.group(1)}{m.group(2)}: {json.dumps(m.group(3).strip(), ensure_ascii=False)}'
        out.append(line)
    return yaml.safe_load('\n'.join(out))
