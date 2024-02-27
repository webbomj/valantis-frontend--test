export interface IStore {
  baseUrl: string;
  password: string;
  allItems: string[];
  fromGood: number;
  toGood: number;
  goodsOnPage: number;
}

export const store: IStore = {
  baseUrl: "http://api.valantis.store:40000/",
  password: "Valantis",
  allItems: [],
  fromGood: 0,
  toGood: 50,
  goodsOnPage: 50,
};
