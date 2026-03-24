function createQueryParams(params: { [key: string]: any }) {
  if (!params || typeof params !== "object") return "";

  const queryString = Object.entries(params)
    .reduce((param, [key, value]) => {
      if (value !== undefined && value !== null) {
        param.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
      return param;
    }, [] as string[])
    .join("&");

  return queryString ? `?${queryString}` : "";
}

export default createQueryParams;
