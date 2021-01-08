if (typeof localStorage === "undefined" || !window.localStorage) {
  throw new Error("local storage must be allowed");
}

export default (mutations, name) => {
  return (mutation, state) => {
    if (mutations.includes(mutation)) {
      localStorage.setItem(name, JSON.stringify(state));
    }
  };
};
