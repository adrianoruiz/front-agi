export const convertToRomanNumeral = (numeral: number): string => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  } as Record<string, number>;

  let str = '';

  for (const i of Object.keys(roman)) {
    const q = Math.floor(numeral / roman[i]);
    numeral -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
};
