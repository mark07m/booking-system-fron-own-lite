import { useState, useCallback } from "react";

export function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setValueCallback = useCallback((value: boolean) => setValue(value), []);

  return {
    value,
    setValue: setValueCallback,
    setTrue,
    setFalse,
    toggle,
  };
}
