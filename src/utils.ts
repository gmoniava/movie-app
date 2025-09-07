export const PAGE_SIZE = 10;

// Converts searchParams object to URLSearchParams
export const searchParamsToURLSearchParams = (sp: Record<string, any>) => {
  const urlSearchParams = new URLSearchParams();
  for (const key in sp) {
    const value = sp[key];
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined) {
      urlSearchParams.set(key, value);
    }
  }

  return urlSearchParams;
};
