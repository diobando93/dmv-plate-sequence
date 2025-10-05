class DmvSequence {

plateNaive(index: number): string {
    let currentIndex = 0;
        
        for (let k = 0; k <= 6; k++) {
            
            const numDigitPositions = 6 - k;
            const numLetterPositions = k;
            const numDigits = Math.pow(10, numDigitPositions);
            const numLetters = Math.pow(26, numLetterPositions);
            
            for (let letterIdx = 0; letterIdx < numLetters; letterIdx++) {
                for (let digitIdx = 0; digitIdx < numDigits; digitIdx++) {
                    if (currentIndex === index) {
                        const digits = numDigitPositions > 0
                            ? digitIdx.toString().padStart(numDigitPositions, '0')
                            : '';
                        let letters = '';
                        let temp = letterIdx;
                        for (let i = 0; i < numLetterPositions; i++) {
                            letters = String.fromCharCode(65 + (temp % 26)) + letters;
                            temp = Math.floor(temp / 26);
                        }
                        return digits + letters;
                    }
                    currentIndex++;
                }
            }
        }
    
     throw new Error(`Index ${index} not found in plateNaive`);
    }


plateAtOptimized(index: number): string {

  const blockSizes: number[] = [];
  for (let k = 0; k <= 6; k++) {
    blockSizes.push(Math.pow(10, 6 - k) * Math.pow(26, k));
  }

  const total = blockSizes.reduce((sum, size) => sum + size, 0);
  if (index < 0 || index >= total) {
    throw new Error(`Index ${index} out of range [0, ${total - 1}]`);
  }
  
  let k = 0;
  let accumulated = 0;
  for (k = 0; k <= 6; k++) {
    if (index < accumulated + blockSizes[k]) {
      break;
    }
    accumulated += blockSizes[k];
  }
  
  const indexInBlock = index - accumulated;
  const numDigitPos = 6 - k;
  const numCombos = Math.pow(10, numDigitPos);
  
  const letterIdx = Math.floor(indexInBlock / numCombos);
  const digitIdx = indexInBlock % numCombos;
  
  const digits = numDigitPos > 0 
    ? digitIdx.toString().padStart(numDigitPos, '0')
    : '';
  
    let letters = '';
  let temp = letterIdx;
  for (let i = 0; i < k; i++) {
    letters = String.fromCharCode(65 + (temp % 26)) + letters;
    temp = Math.floor(temp / 26);
  }
  
  return digits + letters;
}    

plateGeometric(index: number): string {

  const total = (Math.pow(26, 7) - Math.pow(10, 7)) / (26 - 10);

  if (index < 0 || index >= total) {
    throw new Error(`Index ${index} fuera de rango [0, ${total - 1}]`);
  }
  
  let k = 0;
  let accumulated = 0;
  
  for (k = 0; k <= 6; k++) {
    const blockSize = Math.pow(10, 6 - k) * Math.pow(26, k);
    if (index < accumulated + blockSize) {
      break; 
    }
    
    accumulated += blockSize;
  }
  

  const indexInBlock = index - accumulated;
  const numDigitPos = 6 - k;
  const numCombos = Math.pow(10, numDigitPos);
  
  const letterIdx = Math.floor(indexInBlock / numCombos);
  const digitIdx = indexInBlock % numCombos;

  const digits = numDigitPos > 0 
    ? digitIdx.toString().padStart(numDigitPos, '0')
    : '';

  let letters = '';
  let temp = letterIdx;
  for (let i = 0; i < k; i++) {
    letters = String.fromCharCode(65 + (temp % 26)) + letters;
    temp = Math.floor(temp / 26);
  }
  
  return digits + letters;
}

}
export default DmvSequence;
