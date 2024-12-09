import 'https://deno.land/x/lodash@4.17.19/dist/lodash.js';

const _ = (self as any)._;
const decoder: TextDecoder = new TextDecoder('utf-8');
const filePath: string = new URL('./input.txt', import.meta.url).pathname;

interface Result {
  target: number;
  calculated?: number;
  numbers: number[];
}

function generateCombination(
  index: number,
  count: number,
  operators: string[]
) {
  const combination: string[] = [];
  const totalOperators: number = operators.length;

  for (let i = 0; i < count; i++) {
    combination.unshift(operators[index % totalOperators]);
    index = Math.floor(index / totalOperators);
  }

  return combination;
}

function calculateExpression(numbers: number[], combination: string[]): number {
  let calcul = '';
  for (let index = 0; index < numbers.length; index++) {
    const element: number = numbers[index];
    if (index === 0) {
      calcul += eval(`${element}${combination[index]}${numbers[index + 1]}`);
      index++;
    } else calcul = eval(`${calcul} ${combination[index - 1]} ${element}`);
  }

  return Number(calcul);
}

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  const content: string[] = fileContent.split('\n').slice(0, -1) ?? [];

  const operators: string[] = ['+', '*'];
  const successful: Result[] = [];
  const failed: Result[] = [];

  for (let index = 0; index < content.length; index++) {
    const row = content[index];
    const [targetString, numbersString] = row.split(':');
    const target = Number(targetString.trim());
    const numbers = numbersString.trim().split(' ').map(Number);
    const operatorCount = numbers.length - 1;
    const totalCombinations = Math.pow(operators.length, operatorCount);

    for (let i = 0; i < totalCombinations; i++) {
      const combination = generateCombination(i, operatorCount, operators);
      const result = calculateExpression(numbers, combination);

      if (result === target) {
        successful.push({ target, calculated: result, numbers });
        break;
      } else if (totalCombinations - 1 === i) {
        failed.push({ target, numbers });
      }
    }
  }

  const totalOccurrences = successful.reduce(
    (sum, { target }) => sum + target,
    0
  );

  console.log('Total pages : ', totalOccurrences);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
