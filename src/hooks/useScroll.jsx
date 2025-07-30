import { useEffect } from "react";

export default function useScroll(callback, delay = 300) {
  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const handleScroll = debounce(() => {
      const nearBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 200;

      if (nearBottom) callback();
    }, delay);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, delay]);
}
