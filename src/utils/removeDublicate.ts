export const removeDublicate = <T>(array: Array<T>): Array<T> => {
  const result = new Set(array);

  return [...result];
};

export const removeDublicateObj = <T extends { id: string }>(array: T[]) => {
  const result = array.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
  return result;
};
