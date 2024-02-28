import { store } from "../store/store";
import { createHeaderMD5 } from "../utils/createHeaderMD5";
import { bodyBuildType } from "./bodyBuild";

export type methodTypes = "POST" | "GET" | "DELETE" | "PUT";

export const fetchData = async (body: bodyBuildType, method?: methodTypes) => {
  const result = await fetch(store.baseUrl, {
    method: method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": createHeaderMD5(),
    },
    body: JSON.stringify(body),
  });

  if (result.status === 500) {
    throw Error(`Error with status code ${result.status}`);
  }

  return result;
};
