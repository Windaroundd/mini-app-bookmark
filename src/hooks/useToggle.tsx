import { useState, useCallback } from "react";

export type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((): void => {
    setValue((prev: boolean) => !prev);
  }, []);

  const setToggle = useCallback((newValue: boolean): void => {
    setValue(newValue);
  }, []);

  return [value, toggle, setToggle];
}
