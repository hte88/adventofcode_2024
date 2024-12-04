const decoder: TextDecoder = new TextDecoder('utf-8');

const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);

  const rows: string = fileContent.trim();

  const totalValidReports: number[] = [];
  const regex = /mul\((\d+),(\d+)\)/g;

  for (const match of rows.matchAll(regex)) {
    totalValidReports.push(Number(match[1]) * Number(match[2]));
  }

  console.log(
    'Total valid reports:',
    totalValidReports.reduce((a, b) => a + b, 0)
  );
} catch (error) {
  console.error('Error reading the file:', error.message);
}
