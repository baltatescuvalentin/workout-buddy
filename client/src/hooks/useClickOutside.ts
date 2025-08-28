import type React from "react";
import { useEffect } from "react";

function useClickOutside(
  elementRef: React.RefObject<HTMLElement | null>,
  clickEvent: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current?.contains(event.target as Node)
      ) {
        clickEvent();
      }
    }

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elementRef, clickEvent]);
}

export default useClickOutside;
