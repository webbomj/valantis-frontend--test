import md5 from "md5";
import { store } from "../store/store";

export const createHeaderMD5 = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 >= 10
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`;
  const day = currentDate.getDate();

  const formatedDate = `${year}${month}${day}`;

  const md5Hash = md5(`${store.password}_${formatedDate}`);

  return md5Hash;
};
