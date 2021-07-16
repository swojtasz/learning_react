import { useState } from "react";

const useInput2 = (validationLogic) => {
  const [value, setValue] = useState("");
  const [wasValueBlurred, setWasValueBlurred] = useState(false);

  const isValueValid = validationLogic(value);
  const valueHasError = !isValueValid && wasValueBlurred;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const onValueBlur = () => {
    setWasValueBlurred(true);
  };

  const reset = () => {
    setValue("");
    setWasValueBlurred(false);
  };

  return {
    value,
    valueChangeHandler,
    onValueBlur,
    isValueValid,
    valueHasError,
    reset,
  };
};

export default useInput2;
