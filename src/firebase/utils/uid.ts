const possible = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY";

export const genUID = (timestamp: number): string => {
  let str = "";
  for (let i = timestamp; i > 0.1; i = i / 10) {
    const digit = Math.round((i % 10) * 5);
    str = possible.charAt(digit) + str;
  }

  // extra character
  for (let i = 0; i < 2; i++) {
    const rand = Math.floor(Math.random() * possible.length);
    const char = possible.charAt(rand);
    str += char;
  }

  return str;
};
