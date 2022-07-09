export const getUniqueArr = (data, key) => {
  const unique = data.reduce((accumulator, current) => {
    if (!accumulator.some((x) => x[key] === current[key])) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return unique;
};

export const randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const formatPrice = (price) =>
  price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
