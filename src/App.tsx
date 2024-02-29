import { useEffect, useState } from "react";
import "./App.css";
import { Good, filterData, getIds, getItems } from "./api/query";
import { store } from "./store/store";
import { removeDublicate, removeDublicateObj } from "./utils/removeDublicate";
import { GoodList } from "./components/goodsList";
import { Pagination } from "./components/pagination";
import { Filter } from "./components/filter";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [goods, setGoods] = useState<Good[]>([]);

  const [from, setFrom] = useState<number>(store.fromGood);
  const [to, setTo] = useState<number>(store.toGood);

  const [request, setRequest] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    const isFilter = price.trim() || product.trim() || brand.trim();

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
      }
    };

    const filterGoodsHandler = async () => {
      try {
        let filterDataResponse: { result: string[] } = { result: [] };
        if (price) {
          filterDataResponse = await filterData<"price", { result: string[] }>(
            "price",
            Number(price)
          );
          if (!filterDataResponse) {
            throw Error("The filtering price request did not work");
          }
        } else if (product) {
          filterDataResponse = await filterData<
            "product",
            { result: string[] }
          >("product", product);
          if (!filterDataResponse) {
            throw Error("The filtering product request did not work");
          }
        } else if (brand) {
          filterDataResponse = await filterData<"brand", { result: string[] }>(
            "brand",
            brand
          );
          if (!filterDataResponse) {
            throw Error("The filtering brand request did not work");
          }
        }

        const removedDublicateData = removeDublicate(filterDataResponse.result);
        store.filterItems = removedDublicateData;

        const data = await getItems<{ result: Good[] }>(
          store.filterItems.slice(from, to)
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
      }
    };

    if (isFilter) {
      setIsFilter(true);
      filterGoodsHandler();
    } else {
      setIsFilter(false);
      startFunction();
    }
  }, [request, error, from, to]);

  const cbRight = () => {
    if (from >= store.allItems.length) {
      return;
    }
    setIsLoading(true);
    const goodsOnPage = store.goodsOnPage;
    setTo((prev) => prev + goodsOnPage);
    setFrom((prev) => prev + goodsOnPage);
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
    setIsLoading(false);
  };

  const filterGoodsHandler = () => {
    setFrom(0);
    setTo(store.goodsOnPage);
    setRequest((prev) => !prev);
  };

  return (
    <div className="app-wrapper">
      <>
        <Pagination
          cbLeft={cbLeft}
          cbRight={cbRight}
          disableLeft={from === 0}
          disableRight={
            isFilter
              ? to >= store.filterItems.length - 1
              : to >= store.allItems.length - 1
          }
        />

        <Filter
          filterGoodsHandler={filterGoodsHandler}
          setBrand={setBrand}
          setPrice={setPrice}
          setProduct={setProduct}
        />
        <GoodList goods={goods} isLoading={isLoading} />
      </>
    </div>
  );
}

export default App;
