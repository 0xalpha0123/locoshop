export type PopularProduct = {
  brand: string;
  counter: Number;
  id: string;
  imageURLs: Array<String>;
  name: string;
  prices: Array<Price>;
};

export type Price = {
  amountMax: Number;
  amountMin: Number;
  availability?: string;
  currency: string;
  dateSeen?: Array<string>;
  merchant?: string;
  shipping?: string;
  sourceURLs?: Array<string>;
};