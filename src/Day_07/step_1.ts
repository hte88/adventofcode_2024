import 'https://deno.land/x/lodash@4.17.19/dist/lodash.js';

const _ = (self as any)._;
const decoder: TextDecoder = new TextDecoder('utf-8');
const filePath: string = new URL('./input.txt', import.meta.url).pathname;

function generateCombination(
  index: number,
  posibilities: number,
  operators: string[]
) {
  const combination: string[] = [];
  const totalOperators: number = operators.length;

  for (let i = 0; i < posibilities; i++) {
    combination.unshift(operators[index % totalOperators]);
    index = Math.floor(index / totalOperators);
  }

  return combination;
}

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  const content: string[] = fileContent.split('\n').slice(0, -1) ?? [];

  console.log(content);

  const operators: string[] = ['+', '*'];

  for (let index = 0; index < content.length; index++) {
    const row = content[index];
    const [result, numbersString] = row.split(':');
    const numbers = numbersString.trim().split(' ');
    const numOperators = numbers.length - 1;
    const totalCombinations = Math.pow(operators.length, numOperators);

    console.log('numbers =', numbers);
    console.log('posibilite =', numOperators);
    console.log('totalCombinations =', totalCombinations);

    for (let i = 0; i < totalCombinations; i++) {
      const combination = generateCombination(i, numOperators, operators);
      console.log(combination);
    }
  }

  const totalOccurrences = [0];

  console.log(
    'Total pages : ',
    totalOccurrences.reduce((a, b) => a + b, 0)
  );
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
