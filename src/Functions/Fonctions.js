export const ChengHandler = (e, set) => {
  set((data) => ({
    ...data,
    [e.target.name]: e.target.value,
  }));
};
export const sp = (number) => {
  const seperatedNumber = number
    ?.toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return joinedNumber;
};

export function numberToPersianWords(num) {
  const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const thousands = ["", "هزار", "میلیون", "میلیارد","تلیارد"];

  if (num === 0) return "صفر";

  let word = "";
  let place = 0;

  while (num > 0) {
    let n = num % 1000;

    if (n !== 0) {
      let str = "";
      if (n % 100 < 20 && n % 100 >= 10) {
        str = teens[(n % 100) - 10];
      } else {
        str = tens[Math.floor(n / 10) % 10];
        if (n % 10) {
          str = str + " " + ones[n % 10];
        }
      }

      if (Math.floor(n / 100)) {
        if (n >= 100 && n < 200) {
          str = " صد " + str;
        } else if (n >= 200 && n < 300) {
          str = " دویست " + str;
        } else if (n >= 300 && n < 400) {
          str = " سیصد " + str;
        } else if (n >= 500 && n < 600) {
          str = " پانصد " + str;
        } else {
          str = ones[Math.floor(n / 100)] + " صد " + str;
        }
      }

      word = str + " " + thousands[place] + " " + word;
    }

    place++;
    num = Math.floor(num / 1000);
  }

  return word.trim();
}


