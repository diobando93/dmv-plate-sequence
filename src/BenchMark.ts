class BenchMark {

 calculate(fn: Function, name: string, testIdx: number = 100000) {
  const iterations = 1000;
  const start = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    fn(testIdx);
  }
  
  const time = Date.now() - start;
  console.log(`${name.padEnd(20)}: ${time.toString().padStart(4)}ms (${(time/iterations).toFixed(3)}ms/op)`);
}
}
export default BenchMark;
