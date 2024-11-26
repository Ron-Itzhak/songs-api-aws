function titleCaseWord(word: string) {
  if (!word) return word;
  return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}

export function titleCaseSentence(sentence: string) {
  if (!sentence) return sentence;

  const words = sentence.trim().split(" ");
  const titleCasedWords = words.map(titleCaseWord);
  return titleCasedWords.join(" ");
}
