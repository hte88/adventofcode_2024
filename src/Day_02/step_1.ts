const decoder: TextDecoder = new TextDecoder('utf-8');

const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);

  const rows: string[] = fileContent.trim().split('\n');

  let totalValidReports: number = 0;

  rows.forEach((row: string): void => {
    const numbers: number[] = row.split(' ').map(Number);
    let reportsSafe: number = 0;
    let previousSign: number | null = null;

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

      if (reportsSafe >= numbers.length - 1) {
        totalValidReports++;
        break;
      }
    }
  });

  console.log('Total valid reports:', totalValidReports);
} catch (error) {
  console.error('Error reading the file:', error.message);
}
