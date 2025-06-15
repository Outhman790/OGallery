import { useEffect, useRef } from 'react';

const useInfiniteScrollLoader = (targetRef, { hasMore, loading }, onIntersect) => {
  const debounce = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (debounce.current) clearTimeout(debounce.current);
          debounce.current = setTimeout(() => {
            onIntersect();
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef, hasMore, loading, onIntersect]);
};

export default useInfiniteScrollLoader;
