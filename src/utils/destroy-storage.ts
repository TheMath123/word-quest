export const destroyLocalStorage = () => {
  if (typeof window !== "undefined" && localStorage) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        localStorage.removeItem(key);
      }
    }
    console.info("All data in localStorage has been deleted.");
  } else {
    console.info(
      "The localStorage is not available. Make sure you are in the browser environment."
    );
  }
};

export const destroySessionStorage = () => {
  if (typeof window !== "undefined" && sessionStorage) {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== null) {
        sessionStorage.removeItem(key);
      }
    }
    console.info("All data in sessionStorage has been deleted.");
  } else {
    console.info(
      "The sessionStorage is not available. Make sure you are in the browser environment."
    );
  }
};
