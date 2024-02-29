import { Good } from "../../api/query";
import { GoodItem } from "../goodsItem";
import { MyLoader } from "../sceleton";
import css from "./index.module.scss";

export const GoodList = ({
  goods,
  isLoading,
}: {
  goods: Good[];
  isLoading: boolean;
}) => {
  if (goods.length === 0) {
    return isLoading ? (
      <ul className={css.listOfGoods}>
        {goods.map((el) => {
          return <MyLoader key={el.id} />;
        })}
      </ul>
    ) : (
      <div className={css.listOfGoods}>Have not goods</div>
    );
  }

  return isLoading ? (
    <ul className={css.listOfGoods}>
      {goods.map((el) => {
        return <MyLoader key={el.id} />;
      })}
    </ul>
  ) : (
    <ul className={css.listOfGoods}>
      {goods.map((el) => {
        return <GoodItem key={el.id} good={el}></GoodItem>;
      })}
    </ul>
  );
};
