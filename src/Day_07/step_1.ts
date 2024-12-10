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
  let hasUsedOrOperator = false; // Vérifie si "||" a déjà été utilisé

  for (let i = 0; i < count; i++) {
    const operator = operators[index % totalOperators];

    if (operator === '||') {
      if (hasUsedOrOperator) {
        return null; // Invalide, "||" utilisé plus d'une fois
      }
      hasUsedOrOperator = true; // Marque que "||" a été utilisé
    }

    combination.unshift(operator);
    index = Math.floor(index / totalOperators);
  }

  return combination;
}

function calculateExpression(numbers: number[], combination: string[]): number {
  let calcul = '';

  if (combination.length <= 0) {
    return 0;
  }

  //console.log(combination);

  for (let index = 0; index < numbers.length; index++) {
    const element: number = numbers[index];
    if (index === 0) {
      if (combination[index] === '||') {
        calcul += `${element}${numbers[index + 1]}`;
      } else {
        calcul += eval(`${element}${combination[index]}${numbers[index + 1]}`);
      }
      index++;
    } else {
      if (combination[index] === '||') {
        calcul = `${calcul}${element}`;
      } else {
        calcul = eval(`${calcul} ${combination[index - 1]} ${element}`);
      }
    }
  }

  return Number(calcul);
}

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  const content: string[] = fileContent.split('\n').slice(0, -1) ?? [];

  const operators: string[] = ['+', '*', '||'];
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

      if (combination?.includes('||')) {
        const result = calculateExpression(numbers, combination ?? []);

        if (result === target) {
          successful.push({ target, calculated: result, numbers });
          break;
        } else if (totalCombinations - 1 === i) {
          failed.push({ target, numbers });
        }
      }
    }
  }

  console.log(failed.length);
  console.log(successful.length);

  const totalOccurrences = successful.reduce(
    (sum, { target }) => sum + target,
    0
  );

  console.log('Total pages : ', totalOccurrences);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
