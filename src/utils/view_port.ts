import { useLayoutEffect, useState } from "react";

export default function useViewport() {
  const [size, setSize] = useState({
    width: 1920,
    height: 1080,
  });

  useLayoutEffect(() => {
    const handleSize = () => {
      setSize({
        width: window?.innerWidth || 1920,
        height: window?.innerHeight || 1080,
      });
    };

    handleSize();
    window?.addEventListener("resize", handleSize);
    return () => {
      window?.removeEventListener("resize", handleSize);
    };
  }, []);

  return [size.width, size.height];
}
