import { Dispatch, SetStateAction } from "react";
import css from "./index.module.scss";
import { Input } from "../Input";

interface FilterProps {
  setPrice: Dispatch<SetStateAction<string>>;
  setProduct: Dispatch<SetStateAction<string>>;
  setBrand: Dispatch<SetStateAction<string>>;
  filterGoodsHandler: () => void;
}

export const Filter = ({
  setPrice,
  setProduct,
  setBrand,
  filterGoodsHandler,
}: FilterProps) => {
  return (
    <>
      <h3>Filters:</h3>
      <div className={css.wrapper}>
        <Input
          changeHandler={setPrice}
          label="price"
          name="price"
          type="number"
        />
        <Input changeHandler={setProduct} label="product" name="product" />
        <Input changeHandler={setBrand} label="brand" name="brand" />
        <button className={css.button} onClick={() => filterGoodsHandler()}>
          filter
        </button>
      </div>
    </>
  );
};
