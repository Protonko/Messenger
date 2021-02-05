type TMirrorObj = {
  [key: string]: string
}

export const keyMirror = (
  arr: Array<string> = [],
  prefix: string = '',
): TMirrorObj => {
  return arr.reduce((obj: TMirrorObj, key) => {
    obj[key] = prefix + key;
    return obj;
  }, {});
};
