import { Good } from "../../api/query";
import { GoodItem } from "../goodsItem";
// import { Loader } from "../loader";
import { MyLoader } from "../sceleton";
import css from "./index.module.scss";

export const GoodList = ({
  goods,
  isLoading,
}: {
  goods: Good[];
  isLoading: boolean;
}) => {
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
