import 'https://deno.land/x/lodash@4.17.19/dist/lodash.js';

const _ = (self as any)._;
const decoder: TextDecoder = new TextDecoder('utf-8');
const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  const content: string[] = fileContent.split(/\n\s*\n/) ?? [];

  const rules = content[0].split('\n') ?? [];
  const pages = content[1].split('\n').slice(0, -1) ?? [];

  function findRule(page) {
    return rules
      .filter((rule) => page === Number(rule.split('|')[0]))
      .map((rule) => Number(rule?.split('|')[1]));
  }

  function sortByRules() {
    return pages.map((page) => {
      const numberPage = page.split(',').map(Number);
      return numberPage.sort((current, next) => {
        const rule = findRule(current);
        if (rule.includes(next)) {
          return -1;
        }
        if (!rule.includes(next)) {
          return 1;
        }
        return 0;
      });
    });
  }

  const keep = sortByRules().filter((page, i) => {
    const pageOrigin = pages[i].split(',').map(Number);
    return !_.isEqual(page, pageOrigin);
  });

  const totalOccurrences = keep.map((numbers) => {
    return numbers[Math.round((numbers.length - 1) / 2)];
  });

  console.log(
    'Total pages : ',
    totalOccurrences.reduce((a, b) => a + b, 0)
  );
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
