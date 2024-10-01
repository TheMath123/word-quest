export function convertStringToArray(word: string, size = 0) {
  const length = word.length;
  const arr = [];
  if (length > 0 && size === 0) {
    for (let i = 0; i < length; i++) {
      arr.push(word[i] ? word[i] : "");
    }
  }
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      arr.push(word[i] ? word[i] : "");
    }
  }
  return arr;
}
