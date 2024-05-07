const debounce = (func, delay = 600) => {
    let debounceTimer;
  
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  export default debounce;