const decoder: TextDecoder = new TextDecoder('utf-8');

const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);

  const rows: string = fileContent.trim();

  const totalValidReports: number[] = [];

  const l = rows.split(`don't()`);

  console.log(l);
  const r = [];
  for (let index = 0; index < l.length; index++) {
    const element = l[index];

    if (element.search('do()') > -1) {
      const lt = element.split('do()');
      if (lt.length > 0) {
        r.push(`don't()${lt[0]}do()`);
      }
    }
  }

  let ppp = '';
  for (let index = 0; index < r.length; index++) {
    const element = r[index];
    ppp = rows.replaceAll(element, '');
  }

  let pute = ppp;
  if (ppp.search(`don't()`) > -1) {
    const p = ppp.split(`don't()`);

    pute = p[0];
  }
  const regex = /mul\((\d+),(\d+)\)/g;

  for (const match of pute.matchAll(regex)) {
    totalValidReports.push(Number(match[1]) * Number(match[2]));
  }
  /* const re: string = r.toString();
  if (re.search(`don't()`)) {
    re.split(`don't()`);
    console.log('re', re);
  }
  const regex = /mul\((\d+),(\d+)\)/g;

  for (const match of rows.matchAll(regex)) {
    totalValidReports.push(Number(match[1]) * Number(match[2]));
  } */

  console.log(
    'Total valid reports:',
    totalValidReports.reduce((a, b) => a + b, 0)
  );
} catch (error) {
  console.error('Error reading the file:', error.message);
}
