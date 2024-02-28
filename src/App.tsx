import { useEffect, useState } from "react";
import "./App.css";
import { Good, getIds, getItems } from "./api/query";
import { store } from "./store/store";
import { removeDublicate, removeDublicateObj } from "./utils/removeDublicate";
import { GoodList } from "./components/goodsList";
import { Pagination } from "./components/pagination";
import { Loader } from "./components/loader";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [goods, setGoods] = useState<Good[]>([]);
  const [from, setFrom] = useState<number>(store.fromGood);
  const [to, setTo] = useState<number>(store.toGood);

  useEffect(() => {
    setIsLoading(true);

    const startFunction = async () => {
      try {
        const ids = await getIds<{ result: string[] } | undefined>();
        if (!ids) {
          throw Error("Ids undefined");
        }
        store.allItems = removeDublicate(ids.result);

        const data = await getItems<{ result: Good[] }>(
          store.allItems.slice(from, to)
        );

        if (!data) {
          throw Error("Items data undefined");
        }

        setGoods(removeDublicateObj(data.result));
        setIsLoading(false);
      } catch (e: unknown) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        console.log(goods);
        console.log(store.allItems);
      }
    };
    startFunction();
  }, [error, from, to]);

  const cbRight = () => {
    if (from >= store.allItems.length) {
      return;
    }
    setIsLoading(true);
    const goodsOnPage = store.goodsOnPage;
    setTo((prev) => prev + goodsOnPage);
    setFrom((prev) => prev + goodsOnPage);
    console.log(to, from);
    setIsLoading(false);
  };

  const cbLeft = () => {
    if (from === 0) {
      return;
    }
    setIsLoading(true);
    const goodsOnPage = store.goodsOnPage;
    setTo((prev) => prev - goodsOnPage);
    setFrom((prev) => prev - goodsOnPage);
    console.log(to, from);
    setIsLoading(false);
  };

  return (
    <div className="app-wrapper">
      {isLoading && goods.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Pagination
            cbLeft={cbLeft}
            cbRight={cbRight}
            disableLeft={from === 0}
            disableRight={to >= store.allItems.length - 1}
          />
          <GoodList goods={goods} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}

export default App;
