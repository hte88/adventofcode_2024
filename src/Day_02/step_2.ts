const decoder: TextDecoder = new TextDecoder('utf-8');

const filePath: string = new URL('./input.txt', import.meta.url).pathname;

function isSafe(numbers) {
  let previousSign: number | null = null;
  let reportsSafe: number = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];
    const diff = Math.abs(current - next);
    const currentSign = Math.sign(current - next);

    const isSafe = diff > 0 && diff <= 3;

    if (isSafe && (previousSign === null || previousSign === currentSign)) {
      reportsSafe++;
    } else {
      reportsSafe = 0;
    }
    previousSign = currentSign;
  }
  return reportsSafe;
}

function tolerate(numbers: number[], index: number = 0): Boolean {
  if (index >= numbers.length) {
    return false;
  }
  if (index === 0 && isSafe(numbers) >= numbers.length - 1) {
    return true;
  }
  const reducedNumbers = [
    ...numbers.slice(0, index),
    ...numbers.slice(index + 1),
  ];

  if (isSafe(reducedNumbers) >= reducedNumbers.length - 1) {
    return true;
  }

  return tolerate(numbers, index + 1);
}

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);

  const rows: string[] = fileContent.trim().split('\n');

  let totalValidReports: number = 0;

  rows.forEach((row: string): void => {
    const numbers: number[] = row.split(' ').map(Number);
    if (tolerate(numbers)) {
      totalValidReports++;
    }
  });

  console.log('Total valid reports:', totalValidReports);
} catch (error) {
  console.error('Error reading the file:', error.message);
}
