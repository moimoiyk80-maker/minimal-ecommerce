import { useEffect } from "react";

function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const prevOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        prevOverflow;
    };
  }, [isLocked]);
}

export default useScrollLock;