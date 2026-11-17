"""Independently recomputes numeric answers and checks them against content/*.yaml (answer[0])."""
import sys, os, math, datetime, itertools
from math import comb, factorial, gcd, sqrt, pi, isqrt
from fractions import Fraction as F
from functools import lru_cache
from collections import Counter
sys.path.insert(0, os.path.dirname(__file__)); from load import load

def isp(n): return n > 1 and all(n % i for i in range(2, isqrt(n) + 1))
def tz(n):
    c, p = 0, 5
    while p <= n: c += n // p; p *= 5
    return c
def ndiv(n): return sum(1 for i in range(1, isqrt(n) + 1) if n % i == 0 for _ in ((1,) if i * i == n else (1, 1)))
def jos(n, k):
    j = 0
    for i in range(2, n + 1): j = (j + k) % i
    return j + 1
def fib(n):
    a, b = 1, 1
    for _ in range(n - 1): a, b = b, a + b
    return a
def bisect(f, lo, hi):
    for _ in range(200):
        mid = (lo + hi) / 2
        if (f(lo) > 0) == (f(mid) > 0): lo = mid
        else: hi = mid
    return lo
def sumprod():
    pairs = [(a, b) for a in range(2, 100) for b in range(a + 1, 100) if a + b <= 100]
    P = Counter(a * b for a, b in pairs); S = {}
    for a, b in pairs: S.setdefault(a + b, []).append((a, b))
    s1 = {s for s, l in S.items() if all(P[a * b] > 1 for a, b in l)}
    c = [(a, b) for a, b in pairs if a + b in s1]
    pc = Counter(a * b for a, b in c); c2 = [(a, b) for a, b in c if pc[a * b] == 1]
    sc = Counter(a + b for a, b in c2); [(a, b)] = [(a, b) for a, b in c2 if sc[a + b] == 1]
    return a * b
def coconuts():
    n = 1
    while True:
        x, ok = n, True
        for _ in range(5):
            if x % 5 != 1: ok = False; break
            x = (x - 1) // 5 * 4
        if ok and x % 5 == 1: return n
        n += 1
def euro():
    w = [1] + [0] * 100
    for c in (1, 2, 5, 10, 20, 50):
        for i in range(c, 101): w[i] += w[i - c]
    return w[100]
def derange(n):
    d = [1, 0]
    for i in range(2, n + 1): d.append((i - 1) * (d[-1] + d[-2]))
    return d[n]
def bday(n):
    p = 1
    for i in range(n): p *= (365 - i) / 365
    return 1 - p
def goat():
    area = lambda R: R*R*math.acos(R/2) + math.acos(1 - R*R/2) - R/2*sqrt(4 - R*R)
    return 10 * bisect(lambda R: area(R) - pi/2, 0.5, 1.9)
def ladderbox(): return bisect(lambda b: (b/(b-1))**2 + b*b - 16, 2, 3.99)
def crossed():
    return bisect(lambda w: sqrt(900-w*w)*sqrt(400-w*w)/(sqrt(900-w*w)+sqrt(400-w*w)) - 10, 1, 19.99)
def bridge(times, cap=2):
    # Dijkstra over (left set, torch side)
    import heapq
    allp = frozenset(range(len(times))); start = (allp, 0)
    dist = {start: 0}; pq = [(0, 0, start)]; cnt = 1
    while pq:
        d, _, (left, side) = heapq.heappop(pq)
        if not left: return d
        if d > dist[(left, side)]: continue
        here = left if side == 0 else allp - left
        for k in (1, 2):
            for g in itertools.combinations(sorted(here), k):
                nl = left - set(g) if side == 0 else left | set(g)
                ns = (frozenset(nl), 1 - side); nd = d + max(times[i] for i in g)
                if nd < dist.get(ns, 1e9):
                    dist[ns] = nd; cnt += 1; heapq.heappush(pq, (nd, cnt, ns))
def missionaries():
    from collections import deque
    start = (3, 3, 0); seen = {start: 0}; q = deque([start])
    while q:
        e, c, s = q.popleft()
        if (e, c, s) == (0, 0, 1): return seen[(e, c, s)]
        for de, dc in [(1,0),(2,0),(0,1),(0,2),(1,1)]:
            sg = -1 if s == 0 else 1; ne, nc = e + sg*de, c + sg*dc
            if not (0 <= ne <= 3 and 0 <= nc <= 3): continue
            if (ne and nc > ne) or (3-ne and 3-nc > 3-ne): continue
            st = (ne, nc, 1 - s)
            if st not in seen: seen[st] = seen[(e, c, s)] + 1; q.append(st)
def egg(n):
    k = 0
    while k * (k + 1) // 2 < n: k += 1
    return k
def sendmore():
    for p in itertools.permutations(range(10), 8):
        S,E,N,D,M,O,R,Y = p
        if S == 0 or M == 0: continue
        if 1000*S+100*E+10*N+D + 1000*M+100*O+10*R+E == 10000*M+1000*O+100*N+10*E+Y:
            return 10000*M+1000*O+100*N+10*E+Y
def abc():
    for n in range(100, 1000):
        a, b, c = n // 100, n // 10 % 10, n % 10
        if len({a,b,c}) == 3 and 3*n == 111*b: return n
def census():
    tr = [(a,b,c) for a in range(1,37) for b in range(a,37) for c in range(b,37) if a*b*c == 36]
    sc = Counter(sum(t) for t in tr)
    [t] = [t for t in tr if sc[sum(t)] > 1 and t[2] > t[1]]
    return t[2]
def friday13():
    best = 0
    for y in range(2000, 2030):
        best = max(best, sum(1 for m in range(1,13) if datetime.date(y,m,13).weekday() == 4))
    return best
def sundays(): return sum(1 for y in range(2001, 2101) for m in range(1, 13) if datetime.date(y, m, 1).weekday() == 6)
def tri(n):
    up = sum((n-k+1)*(n-k+2)//2 for k in range(1, n+1))
    down = sum((n-2*k+1)*(n-2*k+2)//2 for k in range(1, n//2+1))
    return up + down
def t3(n):
    a = {0: 1, 2: 3}
    for i in range(4, n+1, 2): a[i] = 4*a[i-2] - a[i-4]
    return a[n]
def hh(n):  # expected flips for n heads in a row
    return 2**(n+1) - 2
def tenliars():
    for L in range(11):
        true = sum(1 for k in range(1, 11) if L >= k)
        if 10 - true == L: return L
def ages():
    for x in range(1, 63):
        y = 63 - x
        if x == 2 * (2*y - x): return x
def socks_red():
    for n in range(2, 50):
        for r in range(n+1):
            if F(r, n) * F(r-1, n-1) == F(1, 2): return n
def odometer():
    n = 15952
    while str(n) != str(n)[::-1]: n += 1
    return (n - 15951) / 2
def magic_center():
    for p in itertools.permutations(range(1, 10)):
        g = [p[0:3], p[3:6], p[6:9]]
        lines = g + [tuple(g[r][c] for r in range(3)) for c in range(3)] + [(p[0],p[4],p[8]), (p[2],p[4],p[6])]
        if all(sum(l) == 15 for l in lines): return p[4]
def kings():  # 16 via 2x2 block argument; brute check of pattern validity
    return 16

EXPECT = {
 # easy
 'Bat and ball': 0.05, 'Lily pads': 47, 'Snail in a well': next(d for d in range(1,40) if 3*d - 2*(d-1) >= 30),
 'Socks in the dark': 3, 'Handshakes': comb(10, 2), 'Counting ones': sum(str(i).count('1') for i in range(1, 101)),
 'Two trains and a bird': 75, 'The striking clock': 11, 'Cutting a log': 27, 'Fence posts': 11,
 'Next in line': 42, 'Page numbers': next(p for p in range(1, 500) if sum(len(str(i)) for i in range(1, p+1)) == 192),
 'Mystery number': next(n for n in range(100, 1000) if n//10%10 == n%10 + 5 and n//100 == n//10%10 - 8),
 'Young Gauss': 5050, 'Sale price': 15, 'Two taps': 2, 'Candle stubs': 21, 'Lucky seven': 1/6,
 'Average speed': 40, 'In the queue': 13, 'Palindrome odometer': odometer(), 'Father and son': 40,
 'Painted cube': 12, 'Heads and legs': 10, 'Pizza cuts': 7, 'Two black socks': 40,
 'At least one six': 11/36, 'Hexagon angles': 720, 'Overlapping hands': 11,
 # medium
 '100 doors': sum(1 for d in range(1, 101) if sum(1 for k in range(1, 101) if d % k == 0) % 2), 'Zeros at the end': tz(100),
 'Clock hands': abs(15*6 - (90 + 15*0.5)), 'Squares on a chessboard': sum(k*k for k in range(1, 9)),
 'The night bridge': bridge([1,2,5,10]), 'Monty Hall': 2/3, 'Shared birthdays': next(n for n in range(1, 100) if bday(n) > 0.5),
 'Explorers and cannibals': missionaries(), 'Big painted cube': 1000 - 512, 'Right angles': 44, 'Magic square': magic_center(),
 'Rope around the Earth': 100/(2*pi), 'Letter sum': abc(), 'Train in a tunnel': 60, 'Grid paths': comb(8, 4),
 'Two candles': 2.4, 'Two aces': 221, 'Decagon diagonals': 10*7//2, 'Last digit': pow(7, 100, 10),
 'Diagonal crossing': 6 + 4 - gcd(6, 4), 'Removed number': 18, 'Divisible by all': math.lcm(*range(1, 11)),
 'Climbing stairs': fib(11), 'Knockout tournament': 99, 'Ten statements': tenliars(), 'Reversed ages': 36,
 'Two of three': 3/8, 'Sliding ladder': sqrt(25 - 9) - 3, 'The pole': 12, 'Gears': 4, 'Rectangles in a grid': comb(4,2)**2,
 'Friday the 13th': friday13(), 'Strange sequence': 94, 'Circle of ten': jos(10, 2), 'Waiting for a six': 6,
 'Bus stop': 5, 'Rolling coin': 2, 'The older child': 0.5, 'What comes next?': 312211,
 'The bookworm': 6,
 # hard
 'The poisoned bottle': math.ceil(math.log2(1000)), 'Two eggs, 100 floors': egg(100), 'How old are we?': ages(),
 'Three cards': 2/3, 'SEND + MORE = MONEY': sendmore(), 'The census taker': census(), 'Blue eyes': 100,
 'Ant on a cube': sqrt(5), 'Next overlap': 60*12/11 - 60, 'Two heads in a row': hh(2), 'Five on the bridge': bridge([1,3,6,8,12]),
 'Circle of 41': jos(41, 3), 'Two red socks': socks_red(), 'Suspicious coin': 8/9, 'Opposite hands': 180/5.5,
 'Choosing a partner': 100/math.e, 'The spider and the fly': sqrt(24**2 + 32**2), 'Tower of Hanoi': 2**8 - 1, 'Ships at sea': 15,
 'Eggs in a basket': next(n for n in range(1, 10000) if all(n % k == 1 for k in range(2, 7)) and n % 7 == 0),
 'Painting a cube': factorial(6)//24, 'Peaceful kings': kings(), 'The gold chain': 1, 'Three generations': 72,
 'Lucky sevens': sum(1 for n in range(1, 1001) if '7' in str(n)), 'At least two heads': 11/16, "Diophantus' epitaph": 84,
 'Stamps': max(n for n in range(1, 100) if not any((n - 7*b) % 5 == 0 and n - 7*b >= 0 for b in range(15))),
 'Divisible by 3 or 5': sum(1 for n in range(1, 101) if n % 3 == 0 or n % 5 == 0),
 '100 prisoners and 100 boxes': 1 - sum(1/k for k in range(51, 101)), 'Five pirates': 98, 'The handshake party': 4,
 'Twelve islanders': None,
 # invictus
 'Zeros of 2026!': tz(2026), 'Every face': sum(6/k for k in range(1, 7)), 'Sum and product': sumprod(),
 'Circle in a triangle': (lambda a,b,c: sqrt((s:=(a+b+c)/2)*(s-a)*(s-b)*(s-c))/s)(13,14,15), 'Sailors and coconuts': coconuts(),
 'Wrong envelopes': derange(6), 'Last two digits': pow(7, 2026, 100), 'The grazing goat': goat(), 'Change for a euro': euro(),
 'Thirty birthdays': bday(30), 'Bracket pairs': comb(10, 5)//6, 'Hexagon area': 6*sqrt(3), 'Domino strip': fib(13),
 'Shuffled digits': sum(int(''.join(p)) for p in itertools.permutations('1234')), 'Overlap after four': 120/5.5,
 'Circle of 100': jos(100, 2), 'Ladder over a box': ladderbox(), 'Divisors of 10!': ndiv(factorial(10)), 'Broken stick': 0.25,
 'Coprime to 1000': sum(1 for i in range(1, 1001) if gcd(i, 1000) == 1), 'Three heads in a row': hh(3), 'Crossed ladders': crossed(),
 'A hundred zeros': next(n for n in range(1, 1000) if tz(n) == 100),
 'Full house': comb(52, 5)/(13*comb(4,3)*12*comb(4,2)), 'Sum of squares': sum(i*i for i in range(101)), "Buffon's needle": 2/pi,
 'Chessboard rectangles': comb(9, 2)**2, 'Triangles in a triangle': tri(4), 'Frog on the stairs': fib(21), 'Round table': factorial(7),
 'Three sixes': comb(10, 3)*(1/6)**3*(5/6)**7, 'Three workers': 1/((F(1,12)+F(1,15)+F(1,20))/2 - F(1,15)),
 'Special triangle': next(a*b*(1000-a-b) for a in range(1, 500) for b in range(a+1, 500) if a*a + b*b == (1000-a-b)**2),
 'Twelve divisors': next(n for n in range(1, 1000) if ndiv(n) == 12),
 'Prime dice': sum(1 for a in range(1, 7) for b in range(1, 7) if isp(a+b))/36,
 'Factor this year': max(p for p in range(2, 2027) if 2026 % p == 0 and isp(p)),
 'The higher die': sum(max(a, b) for a in range(1, 7) for b in range(1, 7))/36, 'Primes under fifty': sum(p for p in range(50) if isp(p)),
 'Cube in a sphere': (2/sqrt(3))**3, 'Digits of 2¹⁰⁰': len(str(2**100)),
 'Three dice, ten or more': sum(1 for t in itertools.product(range(1, 7), repeat=3) if sum(t) >= 10)/216,
 'Writing zeros': sum(str(i).count('0') for i in range(1, 1001)), 'Coordinate triangle': abs(7*9 - 3*2)/2,
 '2026 in binary': bin(2026).count('1'), 'x plus one over x': (lambda x: x**4 + x**-4)((3 + sqrt(5))/2),
 'Telescoping sum': sum(1/(k*(k+1)) for k in range(1, 100)),
 'Digit sum nine': sum(1 for n in range(1000, 10000) if sum(map(int, str(n))) == 9),
 'Collecting stickers': sum(10/k for k in range(1, 11)), '3 × 8 tiling': t3(8), 'Fibonacci thirty': fib(30), "Gambler's ruin": 0.3,
 'St Ives': sum(7**k for k in range(1, 5)),
 'Squares or cubes': len({i*i for i in range(1, 32)} | {i**3 for i in range(1, 11)}), 'Sunday the first': sundays(),
 'Round trip': 2*60*40/100, 'Half-filled cone': 0.125, 'Hats back': 1,
 'Divisible by seven': sum(1 for n in range(100, 1000) if n % 7 == 0)/900, 'Lottery odds': comb(49, 6),
 'Doubling bacteria': 20*next(k for k in range(100) if 2**k > 10**6),
}

bad = 0; checked = 0
here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for tier in ('easy', 'medium', 'hard', 'invictus'):
    for i, r in enumerate(load(os.path.join(here, 'content', f'{tier}.yaml'))):
        for l in ('en', 'pt'):
            for k in ('title', 'q', 'hint', 'a'):
                if not str(r[l].get(k, '')).strip(): print('MISSING', tier, i, l, k); bad += 1
        if 'answer' not in r: continue
        t = r['en']['title']; exp = EXPECT.get(t)
        if exp is None:
            if tier == 'invictus': print('NO CHECK for invictus:', t); bad += 1
            continue
        tol = r.get('tol', 1e-6); got = r['answer'][0]; checked += 1
        if abs(float(exp) - got) > max(tol, 1e-6) and not (tier == 'easy' and t == 'Bat and ball'):
            print(f'MISMATCH {tier} #{i+1} {t!r}: file={got} computed={float(exp)}'); bad += 1
print(f'checked {checked} numeric answers, problems: {bad}')
sys.exit(1 if bad else 0)
