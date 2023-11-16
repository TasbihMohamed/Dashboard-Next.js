export function addLeadingZeros(number: number, width: number): string {
  const numberStr = number.toString(); // Convert the number to a string
  const zerosToAdd = Math.max(0, width - numberStr.length + 1); // Calculate the number of zeros to add
  return numberStr.padStart(zerosToAdd, '0');
}
