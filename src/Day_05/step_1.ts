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
      .filter((rule) => page === rule.split('|')[0])
      .map((rule) => Number(rule?.split('|')[1]))
      .sort();
  }

  const res = pages.map((page) => {
    const numberPage = page.split(',');
    return numberPage.sort((next, current) => {
      const rule = findRule(current);
      console.log(rule);

      console.log('current =', current, 'next', next, 'rule =', rule);

      if (Number(current) < rule.find((n) => +n === Number(next))) {
        return -1;
      }
      if (Number(current) > rule.find((n) => +n === Number(next))) {
        return 1;
      }
      return 0;
    });
  });

  console.log(res);

  const totalOccurrences = '';

  console.log('Total des occurences: ', totalOccurrences);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
