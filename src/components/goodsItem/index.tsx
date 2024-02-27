import { Good } from "../../api/query";
import css from "./index.module.scss";

export const GoodItem = ({ good }: { good: Good }) => {
  const { brand, price, product } = good;

  return (
    <li className={css.good}>
      <div className={css.title}>{product}</div>
      {brand ? <div className={css.brand}>{brand}</div> : null}
      <div className={css.price}>{price}</div>
    </li>
  );
};
