import { useReducer } from "react";

const initialInputState = { value: "", wasTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, wasTouched: state.wasTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, wasTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", wasTouched: false };
  }

  return initialInputState;
};

const useInput = (validateInput) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const inputIsValid = validateInput(inputState.value);
  const hasError = !inputIsValid && inputState.wasTouched;

  const inputChangeHandler = (e) => {
    dispatchInput({ type: "INPUT", value: e.target.value });
  };

  const inputBlurHandler = (e) => {
    dispatchInput({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  const inputWasInvalid = hasError ? "form-control invalid" : "form-control";

  return {
    value: inputState.value,
    inputChangeHandler,
    inputBlurHandler,
    reset,
    hasError,
    inputWasInvalid,
    inputIsValid,
  };
};

export default useInput;
