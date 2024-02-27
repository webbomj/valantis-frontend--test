import { store } from "../store/store";

export type methodTypes = "POST" | "GET" | "DELETE" | "PUT";

export const fetchData = (body: unknown, method?: methodTypes) => {
  return fetch(store.baseUrl, {
    method: method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": "todo",
    },
    body: JSON.stringify(body),
  });
};
