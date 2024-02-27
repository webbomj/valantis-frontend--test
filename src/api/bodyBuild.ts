export type actionParams = "get_ids" | "get_items" | "get_fields" | "filter";

export const bodyBuild = <T>(action: actionParams, params: T) => ({
  action,
  params,
});
