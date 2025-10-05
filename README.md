# DMV Plate Sequence Generator

Generate license plates in a specific alphanumeric sequence (000000 → 999999 → 00000A → ZZZZZZ).

## Requirements

- Node.js (v14+)
- TypeScript

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## Plate Sequence Pattern

```
000000 → 000001 → ... → 999999  (1M plates)
00000A → 00001A → ... → 99999Z  (2.6M plates)
0000AA → 0001AA → ... → 9999ZZ  (6.76M plates)
...
AAAAAA → AAAAAB → ... → ZZZZZZ  (308M plates)
```

**Total:** 321,272,406 plates

## Functions

### `plateNaive(index: number): string`

**Complexity:** O(n) time, O(1) space

Iterates from 0 until reaching the target index. Simple but slow for large indices.

```typescript
plateNaive(0)        // "000000"
plateNaive(1000000)  // "00000A"
```

**Use case:** Educational purposes, understanding the algorithm.

---

### `plateAtOptimized(index: number): string`

**Complexity:** O(L) time, O(L) space

Precalculates all block sizes into an array, then finds the target block linearly.

```typescript
plateAtOptimized(0)        // "000000"
plateAtOptimized(1000000)  // "00000A"
```

**Use case:** Production code, good balance of clarity and performance.

---

### `plateGeometric(index: number): string`

**Complexity:** O(L) time, O(1) space

Uses geometric series formula to calculate total: `(26^7 - 10^7) / 16`. Doesn't store block sizes array.

```typescript
plateGeometric(0)        // "000000"
plateGeometric(1000000)  // "00000A"
```

**Use case:** Memory-constrained environments, demonstrating mathematical optimization.

---

### `benchmark(fn: Function, name: string, testIdx: number)`

Measures execution time over 1000 iterations.

```typescript
benchmark(plateNaive, "plateNaive", 100000);
```

## Algorithm Explanation

Each plate belongs to a "block" `k` (0-6) representing the number of trailing letters:

- `k=0`: 6 digits, 0 letters → `000000` to `999999`
- `k=1`: 5 digits, 1 letter → `00000A` to `99999Z`
- `k=6`: 0 digits, 6 letters → `AAAAAA` to `ZZZZZZ`

Block size formula: `10^(6-k) × 26^k`

The sequence exhibits **geometric growth** with ratio `r = 26/10 = 2.6`, meaning each block is 2.6× larger than the previous one.

## Geometric Series

Total plates calculation:

```
Sum = 10^6 + 10^5×26 + 10^4×26^2 + ... + 26^6
    = 10^6 × [1 + 2.6 + 2.6^2 + ... + 2.6^6]
    = (26^7 - 10^7) / 16
    = 321,272,406
```

## Performance Comparison

For index `100,000`:

| Function           | Time/Op  |
|--------------------|----------|
| plateNaive         | ~2000ms  |
| plateAtOptimized   | ~0.001ms |
| plateGeometric     | ~0.001ms |

## Examples

```typescript
plateGeometric(0)          // "000000" (first)
plateGeometric(999999)     // "999999" (last of k=0)
plateGeometric(1000000)    // "00000A" (first of k=1)
plateGeometric(321272405)  // "ZZZZZZ" (last)
```

## Error Handling

All functions throw errors for out-of-range indices:

```typescript
plateGeometric(-1)         // Error: Index -1 out of range
plateGeometric(321272406)  // Error: Index 321272406 out of range
```

## License

MIT