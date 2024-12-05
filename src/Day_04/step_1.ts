const decoder: TextDecoder = new TextDecoder('utf-8');
const filePath: string = new URL('./input.txt', import.meta.url).pathname;

try {
  const data: Uint8Array = await Deno.readFile(filePath);
  const fileContent: string = decoder.decode(data);
  const content: string[] = fileContent.split('\n').slice(0, -1) ?? [];
  const target = 'XMAS';

  const directions = [
    { directionX: 0, directionY: 1 }, // Horizontal droite
    { directionX: 0, directionY: -1 }, // Horizontal gauche
    { directionX: 1, directionY: 0 }, // Vertical bas
    { directionX: -1, directionY: 0 }, // Vertical haut
    { directionX: 1, directionY: 1 }, // Diagonale bas-droite
    { directionX: -1, directionY: -1 }, // Diagonale haut-gauche
    { directionX: 1, directionY: -1 }, // Diagonale bas-gauche
    { directionX: -1, directionY: 1 }, // Diagonale haut-droite
  ];

  function isWordAtPosition(grid, x, y, word, directionX, directionY) {
    for (let index = 0; index < word.length; index++) {
      const newX = x + index * directionX;
      const newY = y + index * directionY;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= grid.length ||
        newY >= grid[0].length ||
        grid[newX][newY] !== word[index]
      ) {
        return false;
      }
    }
    return true;
  }

  function countOccurrences(grid, word) {
    let occurrence = 0;

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        for (const { directionX, directionY } of directions) {
          if (isWordAtPosition(grid, x, y, word, directionX, directionY)) {
            occurrence++;
          }
        }
      }
    }

    return occurrence;
  }
  const totalOccurrences = countOccurrences(content, target);

  console.log('Total des occurences: ', totalOccurrences);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier: ', error.message);
}
