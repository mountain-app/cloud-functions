const camelCaseify = (string: string) => {
  return string
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/ /g, "");
};

export default camelCaseify;
