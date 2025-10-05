import DmvSequence from './DmvSequence';
import BenchMark from './BenchMark';

const dmv = new DmvSequence();
const benchmark = new BenchMark();

const testCases = [
  { idx: 0, expected: "000000", desc: "first plate" },
  { idx: 99, expected: "000099", desc: "plate #99" },
  { idx: 999999, expected: "999999", desc: "last k=0" },
  { idx: 1000000, expected: "00000A", desc: "first k=1" },
  { idx: 1100000, expected: "00000B", desc: "first with B" },
  { idx: 192447360, expected: "AAAAAA", desc: "first k=6" },
  { idx: 501363135, expected: "ZZZZZZ", desc: "last plate" },
];

console.log("Index        | Naive      | Optimized  | Geometric  | Expected   | Status");
console.log("-------------|------------|------------|------------|------------|-------");

testCases.forEach(({ idx, expected, desc }) => {
  let naive = "ERROR";
  let optimized = "ERROR";
  let geometric = "ERROR";

  try { naive = dmv.plateNaive(idx); } catch (e) { naive = "ERROR"; }
  try { optimized = dmv.plateAtOptimized(idx); } catch (e) { optimized = "ERROR"; }
  try { geometric = dmv.plateGeometric(idx); } catch (e) { geometric = "ERROR"; }

  const allMatch = naive === expected && optimized === expected && geometric === expected;
  const status = allMatch ? "✓" : "✗";
  
  console.log(
    `${idx.toString().padStart(12)} | ` +
    `${naive.padEnd(10)} | ` +
    `${optimized.padEnd(10)} | ` +
    `${geometric.padEnd(10)} | ` +
    `${expected.padEnd(10)} | ${status}`
  )
  });

benchmark.calculate(dmv.plateNaive.bind(dmv), "plateNaive", 100000);
benchmark.calculate(dmv.plateAtOptimized.bind(dmv), "plateOptimized", 100000);
benchmark.calculate(dmv.plateGeometric.bind(dmv), "plateGeometric", 100000);