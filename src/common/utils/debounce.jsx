export const debounce = (debounceFn, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => debounceFn.apply(this, args), timeout);
  };
};
