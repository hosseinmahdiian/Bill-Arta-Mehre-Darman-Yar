import { createContext } from "react";

export const reducerContext = createContext("reducer");


export const typeOfBillsDS = [
  { title: "پیش فاکتور", id: 1 },
  { title: "فاکتور فروش", id: 2 },
];

export const typeOFSellDS = [
  { title: "نقدی", id: 1 },
  { title: "غیر نقدی", id: 2 },
  { title: "سایت", id: 3 },
  { title: "سر رسید ", id: 4 },
];

export const consumerDS = [
  {
    title: "بیمارستان عشایر",
    addres: "  لرستان - خرم آباد - خیابان انقلاب بیمارستان شهدای عشایر",
    id: 14013528778,
    tell: "06633236401",
    nationalID: 14002438448,
    economic: 411399958955,
    addCode: 6816991451,
  },
];