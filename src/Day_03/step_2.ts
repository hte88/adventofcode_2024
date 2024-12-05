const decoder: TextDecoder = new TextDecoder('utf-8');
const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  let content: string = fileContent.trim();

  const totalValidReports: number[] = [];

  const countDo = (content.match(/do\(\)/g) || []).length;
  const countDont = (content.match(/don't\(\)/g) || []).length;

  let extractedSegments = '';

  for (let index = 0; index < countDont; index++) {
    const indexDont = content.indexOf(`don't()`);
    const indexDo = content.indexOf(`do()`);

    if (indexDont > -1 && indexDont < indexDo) {
      const segmentToRemove = content.slice(indexDont, indexDo + 4);
      content = content.replace(segmentToRemove, '');
    } else if (indexDont > indexDo) {
      const segmentToKeep = content.slice(indexDo, indexDont);
      extractedSegments += segmentToKeep;
      content = content.replace(segmentToKeep, '');
    } else {
      break;
    }
  }

  const processedContent = extractedSegments + content;

  const regex = /mul\((\d+),(\d+)\)/g;
  for (const match of processedContent.matchAll(regex)) {
    totalValidReports.push(Number(match[1]) * Number(match[2]));
  }

  const total = totalValidReports.reduce((a, b) => a + b, 0);
  console.log('Total des produits valides: ', total);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
