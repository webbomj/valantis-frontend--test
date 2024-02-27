import { useEffect, useState } from "react";
import "./App.css";
import { Good, getIds, getItems } from "./api/query";
import { store } from "./store/store";
import { removeDublicate, removeDublicateObj } from "./utils/removeDublicate";
import { GoodList } from "./components/goodsList";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [goods, setGoods] = useState<Good[]>([]);
  useEffect(() => {
    setIsLoading(true);
    try {
      const startFunction = async () => {
        const ids = await getIds<{ result: string[] } | undefined>();
        if (!ids) {
          throw Error("Ids undefined");
        }
        store.allItems = removeDublicate(ids.result);

        const data = await getItems<{ result: Good[] }>(
          store.allItems.slice(store.fromGood, store.toGood)
        );

        if (!data) {
          throw Error("Items data undefined");
        }

        setGoods(removeDublicateObj(data.result));
      };
      startFunction();
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <GoodList goods={goods}></GoodList>
      )}
    </div>
  );
}

export default App;
