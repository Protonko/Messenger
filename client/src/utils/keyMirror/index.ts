export const keyMirror = (
  arr: Array<string> = [],
  prefix: string = '',
): Record<string, string> => {
  return arr.reduce((obj: Record<string, string>, key) => {
    obj[key] = prefix + key;
    return obj;
  }, {});
};
