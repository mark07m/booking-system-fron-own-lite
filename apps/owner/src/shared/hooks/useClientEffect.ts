import { useEffect } from "react";

export function useClientEffect(effect: () => void, deps?: React.DependencyList) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      effect();
    }
  }, deps);
}
