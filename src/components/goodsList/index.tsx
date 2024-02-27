import { Good } from "../../api/query";
import { GoodItem } from "../goodsItem";
import css from "./index.module.scss";

export const GoodList = ({ goods }: { goods: Good[] }) => {
  return (
    <ul className={css.listOfGoods}>
      {goods.map((el) => {
        return <GoodItem key={el.id} good={el}></GoodItem>;
      })}
    </ul>
  );
};
