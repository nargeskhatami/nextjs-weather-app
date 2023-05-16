// A function that returns any string including white space so that the first letter of each word is capital and the rest are small
export const capitalizeWords = (str: string):string => {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let firstLetter = words[i][0].toUpperCase();
    let restLetters = words[i].slice(1).toLowerCase();
    words[i] = firstLetter + restLetters;
  }
  return words.join(" ");
};
