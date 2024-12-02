const decoder: TextDecoder = new TextDecoder('utf-8');

const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);

  const rows: string[] = fileContent.trim().split('\n');

  const firstCol: number[] = [];
  const secondCol: number[] = [];

  rows.forEach((row: string): void => {
    const columns: string[] = row.split('   ').map((col) => col.trim());
    if (columns.length >= 2) {
      firstCol.push(Number(columns[0]));
      secondCol.push(Number(columns[1]));
    }
  });

  const similarities: number[] = firstCol.map((value) => {
    const occurrences = secondCol.filter((second) => second === value).length;
    return value * occurrences;
  });

  const total: number = similarities.reduce((a, b) => a + b, 0);

  console.log('Total of similarities:', total);
} catch (error) {
  console.error('Error reading the file:', error.message);
}
