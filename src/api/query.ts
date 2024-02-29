import { bodyBuild } from "./bodyBuild";
import { fetchData } from "./fetchData";

export const getIds = async <T>(
  limit?: number,
  offset?: number
): Promise<T> => {
  const response = await fetchData(
    bodyBuild("get_ids", {
      limit,
      offset,
    })
  );

  const data = (await response?.json()) as Promise<T>;
  return await data;
};

export interface Good {
  brand: string | null;
  id: string;
  price: 16700.0;
  product: string;
}

export const getItems = async <T>(ids?: string[]): Promise<T> => {
  const response = await fetchData(
    bodyBuild("get_items", {
      ids,
    })
  );
  const data = (await response?.json()) as Promise<T>;
  return await data;
};

export const getFields = ({
  field,
  offset,
  limit,
}: {
  field?: string;
  offset?: number;
  limit?: number;
}) =>
  fetchData(
    bodyBuild("get_fields", {
      field,
      offset,
      limit,
    })
  );

export type FilterDataType = "price" | "brand" | "product";

export const filterData = async <T extends FilterDataType, P>(
  field: T,
  fieldValue: string | number
) => {
  const response = await fetchData(
    bodyBuild("filter", {
      [field]: fieldValue,
    })
  );

  const data = (await response?.json()) as Promise<P>;
  return await data;
};
