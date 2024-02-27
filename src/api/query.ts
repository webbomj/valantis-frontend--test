import { bodyBuild } from "./bodyBuild";
import { fetchData } from "./fetchData";

export const getIds = (limit?: number, offset?: number) =>
  fetchData(
    bodyBuild("get_ids", {
      limit,
      offset,
    })
  );

export const getItems = (ids?: string[]) =>
  fetchData(
    bodyBuild("get_items", {
      ids,
    })
  );

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

export const filterData = <T>({
  field,
  offset,
  limit,
}: {
  field?: T;
  offset?: number;
  limit?: number;
}) =>
  fetchData(
    bodyBuild("filter", {
      field,
      offset,
      limit,
    })
  );
