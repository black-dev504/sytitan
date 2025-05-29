// scrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, key } = useLocation(); // `key` changes even on same path

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]); // include key to cover same-path rerenders

  return null;
};

export default ScrollToTop;
